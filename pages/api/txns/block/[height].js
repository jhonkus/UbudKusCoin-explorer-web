const {client} = require("../../../../grpc/client");

export default async function handler(req, res) {
    const { height } = req.query;
        client.GetTxnsByHeight({ blockHeight: Number(height) }, function(err, response) {
            if (!err) {
                res.status(200).setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30').json(response);
            } else {
                res.status(502).json({ status: 'error', message: 'Node is unavailable' });
            }
        });
}
