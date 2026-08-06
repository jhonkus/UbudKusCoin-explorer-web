const { client } = require("../../../../grpc/client");
import { ensureMethod, runGrpc } from "../../../../lib/apiHelper";

export default async function handler(req, res) {
  if (ensureMethod(req, res)) return;

  const { height } = req.query;
  runGrpc(res, (cb) =>
    client.GetBlockByHeight({ blockHeight: Number(height) }, cb),
    { cache: 's-maxage=20, stale-while-revalidate=60' },
  );
}

