const {client} = require("../../../grpc/client");

export default async function handler(req, res) {
    client.GetTxnChart({ charttype: 'txn' }, function(err, response) {
        if (!err) {
            res.status(200)
                .setHeader('Content-Type', 'application/json')
                .setHeader('Cache-Control', 'max-age=30')
                .json(response);
        } else {
            res.status(502).json({ status: 'error', message: 'Node is unavailable' });
        }
    });
}
