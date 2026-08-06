const { client } = require("../../../grpc/client");
import { ensureMethod, runGrpc } from "../../../lib/apiHelper";

export default async function handler(req, res) {
  if (ensureMethod(req, res)) return;

  const { address } = req.query;
  runGrpc(res, (cb) => client.GetAccount({ address }, cb), {
    cache: 's-maxage=30, stale-while-revalidate=60',
  });
}

