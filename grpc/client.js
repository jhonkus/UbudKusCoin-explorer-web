import path from 'path'

const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");

const dirRelativeToPublicFolder = 'protos'
const dir = path.resolve('./grpc', dirRelativeToPublicFolder);

const PROTO_PATH = dir + '/bchain.proto';
const PROTO_ACOUNT_PATH = dir + '/account.proto';

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