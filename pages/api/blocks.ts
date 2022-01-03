const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/bchain.proto";
  
const host = "54.254.238.133:5002";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const proto = grpc.loadPackageDefinition(packageDefinition);


export default function handler(req, res) {
    const client = new proto.BChainService(
        host,
        grpc.credentials.createInsecure()
    );
    
    client.GetBlocks({page_number: 1, result_per_page: 20} , function(err, response) {
        // console.log('Data:', response); // API response
        // console.log(err);

        if (!err) {
            res.status(200).json(response)
        } else {
            res.status(200).json(err)
        }
       });
    
    
    // res.status(200).json('finish')
}