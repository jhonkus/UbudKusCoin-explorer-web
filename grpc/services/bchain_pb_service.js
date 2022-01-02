// package: 
// file: bchain.proto

var bchain_pb = require("./bchain_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var BChainService = (function () {
  function BChainService() {}
  BChainService.serviceName = "BChainService";
  return BChainService;
}());

BChainService.GenesisBlock = {
  methodName: "GenesisBlock",
  service: BChainService,
  requestStream: false,
  responseStream: false,
  requestType: bchain_pb.EmptyRequest,
  responseType: bchain_pb.BlockResponse
};

BChainService.LastBlock = {
  methodName: "LastBlock",
  service: BChainService,
  requestStream: false,
  responseStream: false,
  requestType: bchain_pb.EmptyRequest,
  responseType: bchain_pb.BlockResponse
};

BChainService.SendCoin = {
  methodName: "SendCoin",
  service: BChainService,
  requestStream: false,
  responseStream: false,
  requestType: bchain_pb.SendRequest,
  responseType: bchain_pb.TrxResponse
};

BChainService.GetBlocks = {
  methodName: "GetBlocks",
  service: BChainService,
  requestStream: false,
  responseStream: false,
  requestType: bchain_pb.BlockRequest,
  responseType: bchain_pb.BlocksResponse
};

BChainService.GetBalance = {
  methodName: "GetBalance",
  service: BChainService,
  requestStream: false,
  responseStream: false,
  requestType: bchain_pb.AccountRequest,
  responseType: bchain_pb.BalanceResponse
};

BChainService.GetTransactions = {
  methodName: "GetTransactions",
  service: BChainService,
  requestStream: false,
  responseStream: false,
  requestType: bchain_pb.AccountRequest,
  responseType: bchain_pb.TransactionsResponse
};

exports.BChainService = BChainService;

function BChainServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

BChainServiceClient.prototype.genesisBlock = function genesisBlock(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BChainService.GenesisBlock, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

BChainServiceClient.prototype.lastBlock = function lastBlock(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BChainService.LastBlock, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

BChainServiceClient.prototype.sendCoin = function sendCoin(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BChainService.SendCoin, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

BChainServiceClient.prototype.getBlocks = function getBlocks(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BChainService.GetBlocks, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

BChainServiceClient.prototype.getBalance = function getBalance(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BChainService.GetBalance, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

BChainServiceClient.prototype.getTransactions = function getTransactions(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BChainService.GetTransactions, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.BChainServiceClient = BChainServiceClient;

