const { client } = require("../../../../grpc/client");
import { ensureMethod, runGrpc } from "../../../../lib/apiHelper";

export default async function handler(req, res) {
  if (ensureMethod(req, res)) return;

  runGrpc(res, (cb) =>
    client.GetPendingTxns({ page_number: 1, result_per_page: 300 }, cb),
    { cache: 's-maxage=10, stale-while-revalidate=10' },
  );
}
