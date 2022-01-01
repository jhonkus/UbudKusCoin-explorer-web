/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./bchain_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.BChainServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.BChainServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.EmptyRequest,
 *   !proto.BlockResponse>}
 */
const methodDescriptor_BChainService_GenesisBlock = new grpc.web.MethodDescriptor(
  '/BChainService/GenesisBlock',
  grpc.web.MethodType.UNARY,
  proto.EmptyRequest,
  proto.BlockResponse,
  /**
   * @param {!proto.EmptyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.BlockResponse.deserializeBinary
);


/**
 * @param {!proto.EmptyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.BlockResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BlockResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BChainServiceClient.prototype.genesisBlock =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/BChainService/GenesisBlock',
      request,
      metadata || {},
      methodDescriptor_BChainService_GenesisBlock,
      callback);
};


/**
 * @param {!proto.EmptyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BlockResponse>}
 *     Promise that resolves to the response
 */
proto.BChainServicePromiseClient.prototype.genesisBlock =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/BChainService/GenesisBlock',
      request,
      metadata || {},
      methodDescriptor_BChainService_GenesisBlock);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.EmptyRequest,
 *   !proto.BlockResponse>}
 */
const methodDescriptor_BChainService_LastBlock = new grpc.web.MethodDescriptor(
  '/BChainService/LastBlock',
  grpc.web.MethodType.UNARY,
  proto.EmptyRequest,
  proto.BlockResponse,
  /**
   * @param {!proto.EmptyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.BlockResponse.deserializeBinary
);


/**
 * @param {!proto.EmptyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.BlockResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BlockResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BChainServiceClient.prototype.lastBlock =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/BChainService/LastBlock',
      request,
      metadata || {},
      methodDescriptor_BChainService_LastBlock,
      callback);
};


/**
 * @param {!proto.EmptyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BlockResponse>}
 *     Promise that resolves to the response
 */
proto.BChainServicePromiseClient.prototype.lastBlock =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/BChainService/LastBlock',
      request,
      metadata || {},
      methodDescriptor_BChainService_LastBlock);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SendRequest,
 *   !proto.TrxResponse>}
 */
const methodDescriptor_BChainService_SendCoin = new grpc.web.MethodDescriptor(
  '/BChainService/SendCoin',
  grpc.web.MethodType.UNARY,
  proto.SendRequest,
  proto.TrxResponse,
  /**
   * @param {!proto.SendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrxResponse.deserializeBinary
);


/**
 * @param {!proto.SendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.TrxResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrxResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BChainServiceClient.prototype.sendCoin =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/BChainService/SendCoin',
      request,
      metadata || {},
      methodDescriptor_BChainService_SendCoin,
      callback);
};


/**
 * @param {!proto.SendRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrxResponse>}
 *     Promise that resolves to the response
 */
proto.BChainServicePromiseClient.prototype.sendCoin =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/BChainService/SendCoin',
      request,
      metadata || {},
      methodDescriptor_BChainService_SendCoin);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.BlockRequest,
 *   !proto.BlocksResponse>}
 */
const methodDescriptor_BChainService_GetBlocks = new grpc.web.MethodDescriptor(
  '/BChainService/GetBlocks',
  grpc.web.MethodType.UNARY,
  proto.BlockRequest,
  proto.BlocksResponse,
  /**
   * @param {!proto.BlockRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.BlocksResponse.deserializeBinary
);


/**
 * @param {!proto.BlockRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.BlocksResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BlocksResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BChainServiceClient.prototype.getBlocks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/BChainService/GetBlocks',
      request,
      metadata || {},
      methodDescriptor_BChainService_GetBlocks,
      callback);
};


/**
 * @param {!proto.BlockRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BlocksResponse>}
 *     Promise that resolves to the response
 */
proto.BChainServicePromiseClient.prototype.getBlocks =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/BChainService/GetBlocks',
      request,
      metadata || {},
      methodDescriptor_BChainService_GetBlocks);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.AccountRequest,
 *   !proto.BalanceResponse>}
 */
const methodDescriptor_BChainService_GetBalance = new grpc.web.MethodDescriptor(
  '/BChainService/GetBalance',
  grpc.web.MethodType.UNARY,
  proto.AccountRequest,
  proto.BalanceResponse,
  /**
   * @param {!proto.AccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.BalanceResponse.deserializeBinary
);


/**
 * @param {!proto.AccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.BalanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BalanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BChainServiceClient.prototype.getBalance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/BChainService/GetBalance',
      request,
      metadata || {},
      methodDescriptor_BChainService_GetBalance,
      callback);
};


/**
 * @param {!proto.AccountRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BalanceResponse>}
 *     Promise that resolves to the response
 */
proto.BChainServicePromiseClient.prototype.getBalance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/BChainService/GetBalance',
      request,
      metadata || {},
      methodDescriptor_BChainService_GetBalance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.AccountRequest,
 *   !proto.TransactionsResponse>}
 */
const methodDescriptor_BChainService_GetTransactions = new grpc.web.MethodDescriptor(
  '/BChainService/GetTransactions',
  grpc.web.MethodType.UNARY,
  proto.AccountRequest,
  proto.TransactionsResponse,
  /**
   * @param {!proto.AccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.AccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.TransactionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TransactionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BChainServiceClient.prototype.getTransactions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/BChainService/GetTransactions',
      request,
      metadata || {},
      methodDescriptor_BChainService_GetTransactions,
      callback);
};


/**
 * @param {!proto.AccountRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TransactionsResponse>}
 *     Promise that resolves to the response
 */
proto.BChainServicePromiseClient.prototype.getTransactions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/BChainService/GetTransactions',
      request,
      metadata || {},
      methodDescriptor_BChainService_GetTransactions);
};


module.exports = proto;

