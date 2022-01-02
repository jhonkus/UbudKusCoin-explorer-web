// package: 
// file: bchain.proto

import * as jspb from "google-protobuf";

export class SearchRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): void;

  getPageNumber(): number;
  setPageNumber(value: number): void;

  getResultPerPage(): number;
  setResultPerPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchRequest): SearchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchRequest;
  static deserializeBinaryFromReader(message: SearchRequest, reader: jspb.BinaryReader): SearchRequest;
}

export namespace SearchRequest {
  export type AsObject = {
    query: string,
    pageNumber: number,
    resultPerPage: number,
  }
}

export class SendRequest extends jspb.Message {
  getTrxId(): string;
  setTrxId(value: string): void;

  getPublicKey(): string;
  setPublicKey(value: string): void;

  hasTrxInput(): boolean;
  clearTrxInput(): void;
  getTrxInput(): TrxInput | undefined;
  setTrxInput(value?: TrxInput): void;

  hasTrxOutput(): boolean;
  clearTrxOutput(): void;
  getTrxOutput(): TrxOutput | undefined;
  setTrxOutput(value?: TrxOutput): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendRequest): SendRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendRequest;
  static deserializeBinaryFromReader(message: SendRequest, reader: jspb.BinaryReader): SendRequest;
}

export namespace SendRequest {
  export type AsObject = {
    trxId: string,
    publicKey: string,
    trxInput?: TrxInput.AsObject,
    trxOutput?: TrxOutput.AsObject,
  }
}

export class TrxInput extends jspb.Message {
  getTimeStamp(): number;
  setTimeStamp(value: number): void;

  getSenderAddress(): string;
  setSenderAddress(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrxInput.AsObject;
  static toObject(includeInstance: boolean, msg: TrxInput): TrxInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrxInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrxInput;
  static deserializeBinaryFromReader(message: TrxInput, reader: jspb.BinaryReader): TrxInput;
}

export namespace TrxInput {
  export type AsObject = {
    timeStamp: number,
    senderAddress: string,
    signature: string,
  }
}

export class TrxOutput extends jspb.Message {
  getRecipientAddress(): string;
  setRecipientAddress(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  getFee(): number;
  setFee(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrxOutput.AsObject;
  static toObject(includeInstance: boolean, msg: TrxOutput): TrxOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrxOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrxOutput;
  static deserializeBinaryFromReader(message: TrxOutput, reader: jspb.BinaryReader): TrxOutput;
}

export namespace TrxOutput {
  export type AsObject = {
    recipientAddress: string,
    amount: number,
    fee: number,
  }
}

export class AccountRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AccountRequest): AccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountRequest;
  static deserializeBinaryFromReader(message: AccountRequest, reader: jspb.BinaryReader): AccountRequest;
}

export namespace AccountRequest {
  export type AsObject = {
    address: string,
  }
}

export class BlockRequest extends jspb.Message {
  getPageNumber(): number;
  setPageNumber(value: number): void;

  getResultPerPage(): number;
  setResultPerPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BlockRequest): BlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockRequest;
  static deserializeBinaryFromReader(message: BlockRequest, reader: jspb.BinaryReader): BlockRequest;
}

export namespace BlockRequest {
  export type AsObject = {
    pageNumber: number,
    resultPerPage: number,
  }
}

export class BlocksResponse extends jspb.Message {
  clearBlocksList(): void;
  getBlocksList(): Array<BlockModel>;
  setBlocksList(value: Array<BlockModel>): void;
  addBlocks(value?: BlockModel, index?: number): BlockModel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BlocksResponse): BlocksResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlocksResponse;
  static deserializeBinaryFromReader(message: BlocksResponse, reader: jspb.BinaryReader): BlocksResponse;
}

export namespace BlocksResponse {
  export type AsObject = {
    blocksList: Array<BlockModel.AsObject>,
  }
}

export class BlockResponse extends jspb.Message {
  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): BlockModel | undefined;
  setBlock(value?: BlockModel): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BlockResponse): BlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockResponse;
  static deserializeBinaryFromReader(message: BlockResponse, reader: jspb.BinaryReader): BlockResponse;
}

export namespace BlockResponse {
  export type AsObject = {
    block?: BlockModel.AsObject,
  }
}

export class TransactionsResponse extends jspb.Message {
  clearTransactionsList(): void;
  getTransactionsList(): Array<TrxModel>;
  setTransactionsList(value: Array<TrxModel>): void;
  addTransactions(value?: TrxModel, index?: number): TrxModel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionsResponse): TransactionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionsResponse;
  static deserializeBinaryFromReader(message: TransactionsResponse, reader: jspb.BinaryReader): TransactionsResponse;
}

export namespace TransactionsResponse {
  export type AsObject = {
    transactionsList: Array<TrxModel.AsObject>,
  }
}

export class BalanceResponse extends jspb.Message {
  getBalance(): number;
  setBalance(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceResponse): BalanceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceResponse;
  static deserializeBinaryFromReader(message: BalanceResponse, reader: jspb.BinaryReader): BalanceResponse;
}

export namespace BalanceResponse {
  export type AsObject = {
    balance: number,
  }
}

export class TrxModel extends jspb.Message {
  getHash(): string;
  setHash(value: string): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getSender(): string;
  setSender(value: string): void;

  getRecipient(): string;
  setRecipient(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  getFee(): number;
  setFee(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrxModel.AsObject;
  static toObject(includeInstance: boolean, msg: TrxModel): TrxModel.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrxModel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrxModel;
  static deserializeBinaryFromReader(message: TrxModel, reader: jspb.BinaryReader): TrxModel;
}

export namespace TrxModel {
  export type AsObject = {
    hash: string,
    timestamp: number,
    sender: string,
    recipient: string,
    amount: number,
    fee: number,
  }
}

export class BlockModel extends jspb.Message {
  getVersion(): number;
  setVersion(value: number): void;

  getHeight(): number;
  setHeight(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getPrevhash(): string;
  setPrevhash(value: string): void;

  getHash(): string;
  setHash(value: string): void;

  getTransactions(): string;
  setTransactions(value: string): void;

  getValidator(): string;
  setValidator(value: string): void;

  getMerkleroot(): string;
  setMerkleroot(value: string): void;

  getNumoftx(): number;
  setNumoftx(value: number): void;

  getTotalamount(): number;
  setTotalamount(value: number): void;

  getTotalreward(): number;
  setTotalreward(value: number): void;

  getDifficulty(): number;
  setDifficulty(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockModel.AsObject;
  static toObject(includeInstance: boolean, msg: BlockModel): BlockModel.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockModel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockModel;
  static deserializeBinaryFromReader(message: BlockModel, reader: jspb.BinaryReader): BlockModel;
}

export namespace BlockModel {
  export type AsObject = {
    version: number,
    height: number,
    timestamp: number,
    prevhash: string,
    hash: string,
    transactions: string,
    validator: string,
    merkleroot: string,
    numoftx: number,
    totalamount: number,
    totalreward: number,
    difficulty: number,
  }
}

export class EmptyRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyRequest;
  static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
  export type AsObject = {
  }
}

export class TrxResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TrxResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TrxResponse): TrxResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TrxResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TrxResponse;
  static deserializeBinaryFromReader(message: TrxResponse, reader: jspb.BinaryReader): TrxResponse;
}

export namespace TrxResponse {
  export type AsObject = {
    result: string,
  }
}

