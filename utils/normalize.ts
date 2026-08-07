import type {
  Account,
  Block,
  ChartPoint,
  RawRecord,
  Txn,
} from '../types';

const UKSC_BASE_UNITS = 100000000; // 1 UKSC = 10^8 base units

function getField(source: RawRecord | null | undefined, keys: string[], fallback: any = undefined) {
  if (!source) {
    return fallback;
  }

  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null) {
      return value;
    }
  }

  return fallback;
}

function toNumber(value: any, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

export function normalizeTxn(txn: RawRecord | null | undefined): Txn | null {
  if (!txn) {
    return null;
  }

  const rawAmount = toNumber(getField(txn, ['Amount', 'amount']));
  const rawFee = toNumber(getField(txn, ['Fee', 'fee']));

  // Convert raw base units (10^8) to decimal UKSC values
  const amount = rawAmount > 0 ? rawAmount / UKSC_BASE_UNITS : 0;
  const fee = rawFee > 0 ? rawFee / UKSC_BASE_UNITS : 0;

  return {
    ...txn,
    Hash: getField(txn, ['Hash', 'hash', 'txnHash']),
    TimeStamp: toNumber(getField(txn, ['TimeStamp', 'timestamp', 'time_stamp'])),
    Sender: getField(txn, ['Sender', 'sender', 'sender_address']),
    Recipient: getField(txn, ['Recipient', 'recipient', 'recipient_address']),
    Amount: amount,
    Fee: fee,
    Height: toNumber(getField(txn, ['Height', 'height', 'blockHeight'])),
  } as Txn;
}

export function normalizeBlock(block: RawRecord | null | undefined): Block | null {
  if (!block) {
    return null;
  }

  const rawTotalAmount = toNumber(getField(block, ['TotalAmount', 'totalAmount', 'total_amount']));
  const rawTotalReward = toNumber(getField(block, ['TotalReward', 'totalReward', 'total_reward']));

  return {
    ...block,
    Version: toNumber(getField(block, ['Version', 'version'])),
    Height: toNumber(getField(block, ['Height', 'height', 'blockHeight'])),
    TimeStamp: toNumber(getField(block, ['TimeStamp', 'timestamp', 'time_stamp'])),
    PrevHash: getField(block, ['PrevHash', 'prevHash', 'previousHash']),
    Hash: getField(block, ['Hash', 'hash', 'blockHash']),
    Transactions: getField(block, ['Transactions', 'transactions']),
    Validator: getField(block, ['Validator', 'validator']),
    MerkleRoot: getField(block, ['MerkleRoot', 'merkleRoot']),
    NumOfTx: toNumber(getField(block, ['NumOfTx', 'numOfTx', 'num_of_tx'])),
    TotalAmount: rawTotalAmount > 0 ? rawTotalAmount / UKSC_BASE_UNITS : 0,
    TotalReward: rawTotalReward > 0 ? rawTotalReward / UKSC_BASE_UNITS : 0,
    Difficulty: toNumber(getField(block, ['Difficulty', 'difficulty'])),
    BuildTime: toNumber(getField(block, ['BuildTime', 'buildTime', 'build_time'])),
    Size: toNumber(getField(block, ['Size', 'size'])),
  } as Block;
}

export function normalizeAccount(account: RawRecord | null | undefined): Account | null {
  if (!account) {
    return null;
  }

  const rawBalance = toNumber(getField(account, ['balance', 'Balance']));
  const balance = rawBalance > 0 ? rawBalance / UKSC_BASE_UNITS : 0;

  return {
    ...account,
    Id: toNumber(getField(account, ['Id', 'id'])),
    address: getField(account, ['address', 'Address']),
    balance: balance,
    txn_count: toNumber(getField(account, ['txn_count', 'txnCount', 'tx_count'])),
    last_update: toNumber(getField(account, ['last_update', 'lastUpdate'])),
  } as Account;
}

export function normalizeSearchResult(result: RawRecord | null | undefined) {
  if (!result) {
    return null;
  }

  return {
    ...result,
    Id: toNumber(getField(result, ['Id', 'id'])),
    Title: getField(result, ['Title', 'title']),
    SarchText: getField(result, ['SarchText', 'SearchText', 'searchText']),
    Url: getField(result, ['Url', 'url']),
    status: getField(result, ['status', 'Status']) || '',
  };
}

export function normalizeChartPoint(point: RawRecord | null | undefined): ChartPoint | null {
  if (!point) {
    return null;
  }

  return {
    ...point,
    timestamp: toNumber(getField(point, ['timestamp', 'TimeStamp', 'timeStamp'])),
    txn_count: toNumber(getField(point, ['txn_count', 'txnCount'])),
    amount: toNumber(getField(point, ['amount', 'Amount'])),
  } as ChartPoint;
}

export function normalizeArray<T>(
  items: T[] | null | undefined,
  normalizer: (item: T) => any,
): any[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => normalizer(item));
}
