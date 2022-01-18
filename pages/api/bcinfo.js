const client = require("../../grpc/client");

export default async function handler(req, res) {
    const { hash } = req.query
    return new Promise(() => {
        client.GetBchainInfo({ txnHash: hash }, function(err, response) {
            if (!err && response) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                // res.setHeader('Cache-Control', 'max-age=10');
                res.end(JSON.stringify(response));
            } else {
                res.json(err);
                res.status(405).end();
                res.end('error');
            }
        });
    });
}