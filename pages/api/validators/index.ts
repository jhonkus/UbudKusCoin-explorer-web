import type { NextApiRequest, NextApiResponse } from 'next';
const { client } = require('../../../grpc/client');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  client.GetBchainInfo({}, (err: any, info: any) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch network validator data', details: String(err) });
    }

    const blocks = info?.blocks || [];
    const validatorStats: Record<string, { address: string; blocksProduced: number; lastHeight: string }> = {};

    for (const b of blocks) {
      const val = b.validator;
      if (val) {
        if (!validatorStats[val]) {
          validatorStats[val] = { address: val, blocksProduced: 0, lastHeight: b.height };
        }
        validatorStats[val].blocksProduced += 1;
      }
    }

    const validators = Object.values(validatorStats).sort((a, b) => b.blocksProduced - a.blocksProduced);

    return res.status(200).json({
      activeValidators: validators.length,
      totalBlocksAnalyzed: blocks.length,
      validators,
    });
  });
}
