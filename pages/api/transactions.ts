const client = require("../../grpc/client");

export default function transactions(req, res) {
    return new Promise((resolve, reject) => {
        client.GetTransactions({ page_number: 1, result_per_page: 10 }, function(err, response) {
            if (!err) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'max-age=180000');
                res.end(JSON.stringify(response));
            } else {
                res.json(err);
                res.status(405).end();
            }
        });
    });
}