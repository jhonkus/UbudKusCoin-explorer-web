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
  const definition = protoLoader.loadSync(path.join(__dirname, 'protos', file), protoOptions);
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

const blockClient = new BlockService(target, credentials);
const transactionClient = new TransactionService(target, credentials);
const accountClient = new AccountService(target, credentials);

function call(client, method, request, callback) {
  client[method](request, callback);
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
  GetAccount: (request, callback) => call(accountClient, 'getByAddress', { address: request.address }, (error, response) =>
    callback(error, { balance: response?.balance || 0, numBlockValidate: 0, transactions: [], blocks: [] })),
  GetBalance: (request, callback) => call(accountClient, 'getByAddress', { address: request.address }, (error, response) =>
    callback(error, { balance: response?.balance || 0 })),
  GetAccounts: (request, callback) => call(accountClient, 'getRange', request, (error, response) =>
    callback(error, { accounts: response?.accounts || [] })),
  GetPoolInfo: (request, callback) => call(transactionClient, 'getPoolRange', { page_number: 1, result_per_page: 1 }, (error, response) =>
    callback(error, { NumPool: response?.transactions?.length || 0, AmountPool: 0 })),
  GetBchainInfo: (request, callback) => call(blockClient, 'getLast', {}, (error, response) =>
    callback(error, {
      NumBloks: Number(response?.height || 0),
      NumTxns: 0,
      AmountTxns: 0,
      AmountReward: Number(response?.total_reward || 0),
      blocks: response ? [response] : [],
      txns: [],
      Tps: 0,
      NumAcc: 0,
    })),
  GetTxnChart: (request, callback) => callback(null, { datas: [] }),
  Search: (request, callback) => callback(null, { status: 'unsupported', title: 'Search is not available from the node API yet' }),
};

const actClient = {
  GetAll: (request, callback) => call(accountClient, 'getRange', request, callback),
};

module.exports = { client, actClient, nodeAddress };
