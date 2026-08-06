const { actClient } = require("../../../grpc/client");
import { ensureMethod, runGrpc } from "../../../lib/apiHelper";

export default async function handler(req, res) {
  if (ensureMethod(req, res)) return;

  const { slug } = req.query;
  runGrpc(res, (cb) =>
    actClient.GetAll(
      { page_number: Number(slug[0]), result_per_page: Number(slug[1]) },
      cb,
    ),
    { cache: 's-maxage=10, stale-while-revalidate=30' },
  );
}

