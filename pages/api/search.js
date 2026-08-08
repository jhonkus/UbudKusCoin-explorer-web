const { client } = require("../../grpc/client");
const { normalizeSearchResult } = require("../../utils/normalize");

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ status: 'error', message: 'Only POST requests allowed' });
    return;
  }

  const param = String(req.body?.q || req.query.q || '').trim();

  if (!param) {
    res.status(400).json({ status: 'error', message: 'Search query is required' });
    return;
  }

  client.Search({ searchText: param }, function(err, response) {
    if (err) {
      res.status(502).json({
        status: 'error',
        message: 'Search service unavailable',
      });
      return;
    }

    res.status(200).json(normalizeSearchResult(response));
  });
}
