const NODE_UNAVAILABLE = { status: 'error', message: 'Node is unavailable' };

/**
 * Rejects requests that are not of the allowed HTTP method.
 * @param {import('http').ServerResponse} res
 * @param {string[]} allowed
 * @returns {boolean} true if the request was rejected (response already sent)
 */
export function ensureMethod(req, res, allowed = ['GET']) {
  if (!allowed.includes(req.method)) {
    res.status(405).json({ status: 'error', message: `Method ${req.method} not allowed` });
    return true;
  }
  return false;
}

/**
 * Runs a gRPC client call and standardizes the HTTP response.
 * On success sends 200 with the (optional) cache header.
 * On failure sends 502 with a consistent error payload.
 *
 * @param {import('http').ServerResponse} res
 * @param {(callback: (err: any, response: any) => void) => void} call
 * @param {{ cache?: string }} [options]
 */
export function runGrpc(res, call, { cache } = {}) {
  call((err, response) => {
    if (!err && response !== null && response !== undefined) {
      if (cache) {
        res.setHeader('Cache-Control', cache);
      }
      res.status(200).json(response);
    } else {
      res.status(502).json(NODE_UNAVAILABLE);
    }
  });
}
