const client = require("../../grpc/client");
export default async function blocks(req, res) {
    return new Promise<void>((resolve, reject) => {
        client.GetBlocks({ page_number: 1, result_per_page: 10 }, function(err, response) {
            if (!err) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'max-age=100');
                res.end(JSON.stringify(response));
            } else {
                res.json(err);
                res.status(405).end();
            }
        });
    });
}