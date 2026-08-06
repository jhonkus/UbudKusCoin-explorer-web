export interface Txn {
  Hash: string;
  TimeStamp: number;
  Sender: string;
  Recipient: string;
  Amount: number;
  Fee: number;
  Height: number;
}

export interface Block {
  Version: number;
  Height: number;
  TimeStamp: number;
  PrevHash: string;
  Hash: string;
  Transactions: any[];
  Validator: string;
  MerkleRoot: string;
  NumOfTx: number;
  TotalAmount: number;
  TotalReward: number;
  Difficulty: number;
  BuildTime: number;
  Size: number;
}

export interface Account {
  Id: number;
  address: string;
  balance: number;
  txn_count: number;
  last_update: number;
}

export interface ChartPoint {
  timestamp: number;
  txn_count: number;
  amount: number;
}

export interface BcInfo {
  NumBloks: number;
  NumTxns: number;
  AmountTxns: number;
  AmountReward: number;
  Tps: number;
  NumAcc: number;
  blocks: Block[];
  txns: Txn[];
}

export interface PoolInfo {
  NumPool: number;
  AmountPool: number;
}

export interface SearchResult {
  Id: number;
  Title: string;
  SarchText: string;
  Url: string;
  status: string;
}

/** Raw data coming from the gRPC node (field names vary). */
export type RawRecord = Record<string, any>;
