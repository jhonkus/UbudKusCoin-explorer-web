const client = require("../../grpc/client");

export default function handler(req, res) {
  const param = req.query.q;
  return new Promise(() => {
    client.Search({ searchText: param }, function(err, response) {
      console.log('== res:', response);

      if (!err) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
      } else {
        res.json(err);
        res.status(405).end();
        res.end('error');
      }
    });
  });

  
}