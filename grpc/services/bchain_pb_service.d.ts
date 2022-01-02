// package: 
// file: bchain.proto

import * as bchain_pb from "./bchain_pb";
import {grpc} from "@improbable-eng/grpc-web";

type BChainServiceGenesisBlock = {
  readonly methodName: string;
  readonly service: typeof BChainService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof bchain_pb.EmptyRequest;
  readonly responseType: typeof bchain_pb.BlockResponse;
};

type BChainServiceLastBlock = {
  readonly methodName: string;
  readonly service: typeof BChainService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof bchain_pb.EmptyRequest;
  readonly responseType: typeof bchain_pb.BlockResponse;
};

type BChainServiceSendCoin = {
  readonly methodName: string;
  readonly service: typeof BChainService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof bchain_pb.SendRequest;
  readonly responseType: typeof bchain_pb.TrxResponse;
};

type BChainServiceGetBlocks = {
  readonly methodName: string;
  readonly service: typeof BChainService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof bchain_pb.BlockRequest;
  readonly responseType: typeof bchain_pb.BlocksResponse;
};

type BChainServiceGetBalance = {
  readonly methodName: string;
  readonly service: typeof BChainService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof bchain_pb.AccountRequest;
  readonly responseType: typeof bchain_pb.BalanceResponse;
};

type BChainServiceGetTransactions = {
  readonly methodName: string;
  readonly service: typeof BChainService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof bchain_pb.AccountRequest;
  readonly responseType: typeof bchain_pb.TransactionsResponse;
};

export class BChainService {
  static readonly serviceName: string;
  static readonly GenesisBlock: BChainServiceGenesisBlock;
  static readonly LastBlock: BChainServiceLastBlock;
  static readonly SendCoin: BChainServiceSendCoin;
  static readonly GetBlocks: BChainServiceGetBlocks;
  static readonly GetBalance: BChainServiceGetBalance;
  static readonly GetTransactions: BChainServiceGetTransactions;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class BChainServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  genesisBlock(
    requestMessage: bchain_pb.EmptyRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.BlockResponse|null) => void
  ): UnaryResponse;
  genesisBlock(
    requestMessage: bchain_pb.EmptyRequest,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.BlockResponse|null) => void
  ): UnaryResponse;
  lastBlock(
    requestMessage: bchain_pb.EmptyRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.BlockResponse|null) => void
  ): UnaryResponse;
  lastBlock(
    requestMessage: bchain_pb.EmptyRequest,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.BlockResponse|null) => void
  ): UnaryResponse;
  sendCoin(
    requestMessage: bchain_pb.SendRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.TrxResponse|null) => void
  ): UnaryResponse;
  sendCoin(
    requestMessage: bchain_pb.SendRequest,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.TrxResponse|null) => void
  ): UnaryResponse;
  getBlocks(
    requestMessage: bchain_pb.BlockRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.BlocksResponse|null) => void
  ): UnaryResponse;
  getBlocks(
    requestMessage: bchain_pb.BlockRequest,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.BlocksResponse|null) => void
  ): UnaryResponse;
  getBalance(
    requestMessage: bchain_pb.AccountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.BalanceResponse|null) => void
  ): UnaryResponse;
  getBalance(
    requestMessage: bchain_pb.AccountRequest,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.BalanceResponse|null) => void
  ): UnaryResponse;
  getTransactions(
    requestMessage: bchain_pb.AccountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.TransactionsResponse|null) => void
  ): UnaryResponse;
  getTransactions(
    requestMessage: bchain_pb.AccountRequest,
    callback: (error: ServiceError|null, responseMessage: bchain_pb.TransactionsResponse|null) => void
  ): UnaryResponse;
}

