const {actClient} = require("../../../grpc/client");

export default async function handler(req, res) {
    const { slug } = req.query;
        actClient.GetAll({ page_number: Number(slug[0]), result_per_page: Number(slug[1]) }, function(err, response) {
            if (!err) {
                res.status(200).setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30').json(response);
            } else {
                res.status(502).json({ status: 'error', message: 'Node is unavailable' });
            }
        });
}
