const {client} = require("../../../grpc/client");

export default async function handler(req, res) {
    const { address } = req.query
       client.GetAccount({ address: address }, function(err, response) {
            if (!err) {
                res.status(200).setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60').json(response);
            } else {
                res.status(502).json({ status: 'error', message: 'Node is unavailable' });
            }
        }); 
}
