const client = require("../../grpc/client");

export default function handler(req, res) {    
    client.GetTransactions({ page_number: 1, result_per_page: 20 }, function(err, response) {
 
        if (!err) {
            res.status(200).json(response)
        } else {
            res.status(200).json(err)
        }
    });


    // res.status(200).json('finish')
}