import path from 'path'

const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");

const dirRelativeToPublicFolder = 'protos'
const dir = path.resolve('./grpc', dirRelativeToPublicFolder);
const PROTO_PATH = dir + '/bchain.proto';
const host = "209.126.3.159:5002";
// const host = "localhost:5002";

const options = {
    keepCase: true,
    longs: String,
    enums: String, 
    defaults: true,
    oneofs: true,
};


const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.BChainService(
    host,
    grpc.credentials.createInsecure()
);

module.exports = client;