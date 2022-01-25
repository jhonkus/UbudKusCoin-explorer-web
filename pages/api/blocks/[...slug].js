const {client} = require("../../../grpc/client");

export default async function handler(req, res) {
    const { slug } = req.query;
    return new Promise(() => {
        client.GetBlocks({ page_number: slug[0], result_per_page: slug[1] }, function(err, response) {
            if (!err) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'max-age=10');
                res.end(JSON.stringify(response));
            } else {
                res.json(err);
                res.status(405).end();
                res.end('error');
            }
        });
    });
}