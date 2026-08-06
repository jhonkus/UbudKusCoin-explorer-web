const path = require('path');
const fs = require('fs');

const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");

// Try multiple possible locations for proto files
function findProtoDir() {
  const candidates = [
    path.join(__dirname, 'protos'),
    path.join(process.cwd(), 'grpc', 'protos'),
    path.join(process.cwd(), '..', 'grpc', 'protos'),
    path.join(__dirname, '..', 'grpc', 'protos'),
    path.join(__dirname, '..', '..', 'grpc', 'protos'),
    path.join(__dirname, '..', '..', '..', 'grpc', 'protos'),
  ];

  for (const dir of candidates) {
    const protoPath = path.join(dir, 'bchain.proto');
    if (fs.existsSync(protoPath)) {
      return dir;
    }
  }

  // Fallback: search from project root
  const projectRoot = process.cwd();
  const grpcDir = path.join(projectRoot, 'grpc', 'protos');
  return grpcDir;
}

const dir = findProtoDir();

const PROTO_PATH = path.join(dir, 'bchain.proto');
const PROTO_ACOUNT_PATH = path.join(dir, 'account.proto');

// const host = "localhost:5002";
//209.126.3.159

// const host = "45.63.87.189:5002";
const host = "209.126.3.159:5002";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};


const blockDefinition = protoLoader.loadSync(PROTO_PATH, options);
const accountDefinition = protoLoader.loadSync(PROTO_ACOUNT_PATH, options);

const proto = grpc.loadPackageDefinition(blockDefinition);
const account_proto = grpc.loadPackageDefinition(accountDefinition);

const client = new proto.BChainService(
    host,
    grpc.credentials.createInsecure()
);


const actClient = new account_proto.AccountService(
    host,
    grpc.credentials.createInsecure()
);

module.exports = {client, actClient};