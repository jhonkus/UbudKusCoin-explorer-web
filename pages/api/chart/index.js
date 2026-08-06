const { client } = require("../../../grpc/client");
import { ensureMethod, runGrpc } from "../../../lib/apiHelper";

export default async function handler(req, res) {
  if (ensureMethod(req, res)) return;

  runGrpc(res, (cb) => client.GetTxnChart({ charttype: 'txn' }, cb), {
    cache: 'max-age=30',
  });
}

