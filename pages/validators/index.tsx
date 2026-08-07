import React from 'react';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ValidatorsPage() {
  const { data, error, isLoading } = useSWR('/api/validators', fetcher, { refreshInterval: 5000 });

  return (
    <Layout pageTitle="Validator Leaderboard - UbudKusCoin Explorer">
      <div className="container my-5 pt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 font-weight-bold mb-1">Validator Leaderboard</h1>
            <p className="text-muted small">
              Active consensus validators producing blocks on the UbudKusCoin network.
            </p>
          </div>
          <span className="badge bg-success px-3 py-2 fs-6">
            🟢 Active Validators: {data?.activeValidators || 0}
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Fetching validator consensus metrics...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">Failed to load validator leaderboard.</div>
        ) : (
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">Validator Address</th>
                      <th scope="col" className="text-center">Blocks Produced</th>
                      <th scope="col" className="text-end">Last Block Height</th>
                      <th scope="col" className="text-end">Consensus Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.validators?.map((val: any, idx: number) => (
                      <tr key={val.address}>
                        <td>
                          <span className="badge bg-light text-dark border">#{idx + 1}</span>
                        </td>
                        <td>
                          <Link href={`/address/${val.address}`} className="text-decoration-none font-monospace fw-bold text-primary">
                            {val.address}
                          </Link>
                        </td>
                        <td className="text-center fw-bold">{val.blocksProduced}</td>
                        <td className="text-end font-monospace">#{val.lastHeight}</td>
                        <td className="text-end">
                          <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                            Active Proposer
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!data?.validators || data.validators.length === 0) && (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-muted">
                          No active validators found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
