import React from 'react';
import Layout from '../../components/Layout';

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/infos/bcinfo',
    description: 'Fetch network-wide blockchain statistics (block height, transaction count, TPS, active accounts).',
    response: `{
  "NumBloks": "2257",
  "NumTxns": "1",
  "AmountTxns": 1000000000,
  "NumAcc": "7",
  "Tps": 0
}`,
  },
  {
    method: 'GET',
    path: '/api/block/height/:height',
    description: 'Fetch block details by block height sequence number.',
    response: `{
  "block": {
    "height": "561",
    "hash": "2007832352c3...",
    "time_stamp": "1786110389",
    "validator": "4kg3E1JNppZ..."
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/txn/:hash',
    description: 'Fetch detailed information for a single transaction by TxID hash.',
    response: `{
  "txn": {
    "hash": "0x551fc793...",
    "sender": "4itS3kYn...",
    "recipient": "4kQuyhm4...",
    "amount": 1000000000,
    "fee": 10000,
    "height": "561"
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/address/:address',
    description: 'Fetch account balance, nonce, and associated transaction history.',
    response: `{
  "balance": 1000000000,
  "numBlockValidate": 0,
  "transactions": [...]
}`,
  },
  {
    method: 'GET',
    path: '/api/validators',
    description: 'Fetch list of active block proposer validators and block production counts.',
    response: `{
  "activeValidators": 4,
  "validators": [...]
}`,
  },
];

export default function ApiDocsPage() {
  return (
    <Layout pageTitle="API Documentation - UbudKusCoin Explorer">
      <div className="container my-5 pt-4">
        <h1 className="h3 font-weight-bold mb-2">Explorer REST API Documentation</h1>
        <p className="text-muted mb-4">
          Public REST API endpoints for developers building dApps, wallets, and indexers on UbudKusCoin.
        </p>

        <div className="row">
          {ENDPOINTS.map((ep, idx) => (
            <div className="col-12 mb-4" key={idx}>
              <div className="card shadow-sm border-0">
                <div className="card-header bg-light d-flex align-items-center justify-content-between">
                  <div>
                    <span className="badge bg-primary me-2 font-monospace">{ep.method}</span>
                    <code className="fs-6 text-dark fw-bold">{ep.path}</code>
                  </div>
                  <a
                    href={ep.path.replace(':height', '1').replace(':hash', '0x').replace(':address', '4itS3kYnXo7PJDQ1noaaVBawTEwysyb73hKNKHc8C7bsLsytfua')}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary">
                    Try Out ↗
                  </a>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">{ep.description}</p>
                  <label className="form-label text-uppercase small fw-bold text-secondary">Example JSON Response</label>
                  <pre className="bg-dark text-light p-3 rounded font-monospace small mb-0">
                    {ep.response}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
