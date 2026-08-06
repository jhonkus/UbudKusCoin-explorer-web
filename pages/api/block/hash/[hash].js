const {client} = require("../../../../grpc/client");

export default async function handler(req, res) {
    const { hash } = req.query
    
       client.GetBlockByHash({ blockHash: hash }, function(err, response) {
            if (!err) {
                res.status(200).setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=60').json(response);
            } else {
                res.status(502).json({ status: 'error', message: 'Node is unavailable' });
            }
        });
}
