import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'

// const grpc = require('@grpc/grpc-js');
// const protoLoader = require("@grpc/proto-loader");
// const PROTO_PATH = __dirname + "/bchain.proto";

// const host = "54.254.238.133:5002";

// const options = {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true,
// };

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

// const proto = grpc.loadPackageDefinition(packageDefinition);


export default function handler(req, res) {
    // const client = new proto.BChainService(
    //     host,
    //     grpc.credentials.createInsecure()
    // );

    const { serverRuntimeConfig } = getConfig()

    // client.GetBlocks({ page_number: 1, result_per_page: 20 }, function (err, response) {
 
    //     if (!err) {
    //         res.status(200).json(response)
    //     } else {
    //         res.status(200).json(err)
    //     }
    // });


    const dirRelativeToPublicFolder = 'img'

    const dir = path.resolve('./public', dirRelativeToPublicFolder);
  
    const filenames = fs.readdirSync(dir);
  
    // const proto = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))
  
    // const packageDefinition = protoLoader.loadSync(proto, options)

    // const dirRelativeToPublicFolder = 'img'

    // const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './public', dirRelativeToPublicFolder);
  
    // const filenames = fs.readdirSync(dir);

    
    res.statusCode = 200
    res.json({file: filenames});

    // res.status(200).json('finish')
}