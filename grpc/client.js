const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const protoOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

function loadService(file, service) {
  const definition = protoLoader.loadSync(path.join(process.cwd(), 'grpc', 'protos', file), protoOptions);
  const loaded = grpc.loadPackageDefinition(definition);
  return loaded[service];
}

const nodeAddress = process.env.UKC_NODE_GRPC_URL || '127.0.0.1:5000';
const credentials = nodeAddress.startsWith('https://')
  ? grpc.credentials.createSsl()
  : grpc.credentials.createInsecure();
const target = nodeAddress.replace(/^https?:\/\//, '');

const BlockService = loadService('block.node.proto', 'BlockService');
const TransactionService = loadService('transaction.node.proto', 'TransactionService');
const AccountService = loadService('account.node.proto', 'AccountService');
const ReadModelService = loadService('read_model.node.proto', 'ReadModelService');

const blockClient = new BlockService(target, credentials);
const transactionClient = new TransactionService(target, credentials);
const accountClient = new AccountService(target, credentials);
const readModelClient = new ReadModelService(target, credentials);

function call(client, method, request, callback) {
  client[method](request, callback);
}

function callAsync(clientInstance, method, request) {
  return new Promise((resolve, reject) => {
    call(clientInstance, method, request, (error, response) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(response);
    });
  });
}

async function fetchPagedItems(clientInstance, method, baseRequest, collectionKey, pageSize = 1000, maxPages = 50) {
  const items = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const response = await callAsync(clientInstance, method, {
      ...baseRequest,
      page_number: page,
      result_per_page: pageSize,
    });
    const pageItems = Array.isArray(response?.[collectionKey]) ? response[collectionKey] : [];

    if (pageItems.length === 0) {
      break;
    }

    items.push(...pageItems);

    if (pageItems.length < pageSize) {
      break;
    }
  }

  return items;
}

// Compatibility facade for the existing explorer pages. All calls now target
// the current node service contracts instead of the retired BChainService.
const client = {
  GetBlocks: (request, callback) => call(blockClient, 'getRange', request, (error, response) =>
    callback(error, { blocks: response?.blocks || [] })),
  GetBlockByHeight: (request, callback) => call(blockClient, 'getByHeight', { height: request.blockHeight }, (error, response) =>
    callback(error, { block: response, isLast: false })),
  GetBlockByHash: (request, callback) => call(blockClient, 'getByHash', { hash: request.blockHash }, (error, response) =>
    callback(error, { block: response, isLast: false })),
  GetLastBlock: (request, callback) => call(blockClient, 'getLast', {}, (error, response) =>
    callback(error, { block: response, isLast: true })),
  GetTxnByHash: (request, callback) => call(transactionClient, 'getByHash', { hash: request.txnHash }, (error, response) =>
    callback(error, { txn: response })),
  GetTxns: (request, callback) => call(transactionClient, 'getRange', request, (error, response) =>
    callback(error, { transactions: response?.transactions || [] })),
  GetTxnsByHeight: (request, callback) => call(transactionClient, 'getRange', { height: request.blockHeight }, (error, response) =>
    callback(error, { transactions: response?.transactions || [] })),
  GetPendingTxns: (request, callback) => call(transactionClient, 'getPendingTxns', request, (error, response) =>
    callback(error, { transactions: response?.transactions || [] })),
  GetAccount: (request, callback) => call(accountClient, 'getByAddress', { address: request.address }, (error, response) => {
    if (error) return callback(error);

    const address = String(request?.address || '').trim();
    const account = response || {};

    Promise.all([
      fetchPagedItems(transactionClient, 'getRange', { address }, 'transactions'),
      fetchPagedItems(blockClient, 'getRange', {}, 'blocks'),
    ]).then(([transactions, blocks]) => {
      const validatedBlocks = blocks.filter((block) => String(block?.validator || '') === address);
      const exists = Boolean(account?.address)
        || Number(account?.balance || 0) > 0
        || transactions.length > 0
        || validatedBlocks.length > 0;

      callback(null, {
        address: account?.address || address,
        exists,
        balance: account?.balance || 0,
        numBlockValidate: validatedBlocks.length,
        transactions,
        blocks: validatedBlocks,
      });
    }).catch((fetchError) => callback(fetchError));
  }),
  GetBalance: (request, callback) => call(accountClient, 'getByAddress', { address: request.address }, (error, response) =>
    callback(error, { balance: response?.balance || 0 })),
  GetAccounts: (request, callback) => call(accountClient, 'getRange', request, (error, response) =>
    callback(error, { accounts: response?.accounts || [] })),
  GetPoolInfo: (request, callback) => call(readModelClient, 'getStats', {}, (error, response) =>
    callback(error, { NumPool: response?.pending_count || 0, AmountPool: response?.pending_amount || 0 })),
  GetBchainInfo: (request, callback) => call(readModelClient, 'getStats', {}, (error, response) => {
    if (error) return callback(error);
    call(blockClient, 'getRange', { page_number: 1, result_per_page: 10 }, (blockError, blocks) => {
      if (blockError) return callback(blockError);
      call(transactionClient, 'getRange', { page_number: 1, result_per_page: 10 }, (transactionError, transactions) => {
        if (transactionError) return callback(transactionError);

        const recentBlocks = blocks?.blocks || [];
        let tps = 0;
        if (recentBlocks.length >= 2) {
          const newestTime = Number(recentBlocks[0].time_stamp);
          const oldestTime = Number(recentBlocks[recentBlocks.length - 1].time_stamp);
          const timeSpan = newestTime - oldestTime;
          const totalTxsInWindow = recentBlocks.reduce((acc, b) => acc + Number(b.num_of_tx || 0), 0);
          if (timeSpan > 0) {
            tps = Number((totalTxsInWindow / timeSpan).toFixed(2));
          }
        }

        callback(null, {
          NumBloks: response?.block_count || 0,
          NumTxns: response?.transaction_count || 0,
          AmountTxns: response?.transaction_amount || 0,
          AmountReward: response?.reward_amount || 0,
          NumAcc: response?.account_count || 0,
          blocks: recentBlocks,
          txns: transactions?.transactions || [],
          Tps: tps,
        });
      });
    });
  }),
  GetTxnChart: (request, callback) => call(readModelClient, 'getTransactionChart', { limit: 30 }, (error, response) =>
    callback(error, { datas: response?.points || [] })),
  Search: (request, callback) => {
    const query = String(request?.searchText || '').trim();
    const found = (title, url) => callback(null, {
      Id: 1,
      Title: title,
      SarchText: query,
      Url: url,
      status: 'ok',
    });
    const notFound = () => callback(null, {
      Id: 0,
      Title: 'Not found',
      SarchText: query,
      Url: '/notfound',
      status: 'not_found',
    });
    if (!query) return notFound();

    const tryAccount = () => accountClient.getByAddress({ address: query }, (error, account) => {
      if (!error && account?.address) return found('Account', `/address/${query}`);
      notFound();
    });
    const tryTransaction = () => transactionClient.getByHash({ hash: query }, (error, transaction) => {
      if (!error && transaction?.hash) return found('Transaction', `/txns/${query}`);
      tryAccount();
    });
    const tryBlock = () => blockClient.getByHash({ hash: query }, (error, block) => {
      if (!error && block?.hash) return found('Block', `/blocks/hash/${query}`);
      tryTransaction();
    });

    if (/^\d+$/.test(query)) {
      return blockClient.getByHeight({ height: Number(query) }, (error, block) => {
        if (!error && block?.height) return found('Block', `/blocks/height/${query}`);
        tryBlock();
      });
    }
    tryBlock();
  },
};

const actClient = {
  GetAll: (request, callback) => call(accountClient, 'getRange', request, callback),
};

module.exports = { client, actClient, nodeAddress };
