import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../../components/Layout'
import Breadcrumb from '../../components/Breadcrumb';
import TableAccountTxns from '../../components/account/TableAccountTxns';
import TableAccountBlocks from '../../components/account/TableAccountBlocks';
import { useAccount } from '../../grpc/useFetch'
import { formatAmount } from '../../utils/util';
import Skeleton from 'react-loading-skeleton';
import CopyText from '../../components/copy/copy_text';


export default function Block() {
    const router = useRouter()
    const { address } = router.query;
    const accountAddress = Array.isArray(address) ? address[0] : address;

    const [txnsClass, setTxnsClass] = useState('nav-link active');
    const [blocksClass, setBlocksClass] = useState('nav-link');
    const [activeNav, setActiveNav] = useState('txns');

    const handleClick = (arg) => {
        setActiveNav(arg)
        if (arg === 'txns') {
            setTxnsClass('nav-link active')
            setBlocksClass('nav-link')
        } else {
            setBlocksClass('nav-link active')
            setTxnsClass('nav-link')
        }
    };

    const { transactions, blocks, balance, numBlockValidate, exists, isLoading, isError } = useAccount(accountAddress?.toString());
    const hasAccountData = Boolean(accountAddress) && exists && !isLoading && !isError;
    const hasTransactions = transactions.length > 0;
    const hasBlocks = blocks.length > 0;

    return (
        <Layout pageTitle="Account Address">
            <main id="main" className="main">
                <div className="pagetitle">
                    <h5 className="d-inline-flex align-items-center gap-2 flex-wrap">
                        <span>Address</span>
                        <span className="hash-mono text-break text-muted fw-normal">{accountAddress}</span>
                        <CopyText msg="Copy address to clipboard" text={accountAddress} />
                    </h5>
                    <Breadcrumb items={[{ href: '/', label: 'Home' }, { label: 'Address' }]} />
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card detail-card">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <span className="fw-bold">Overview</span>
                                    <span className="status-badge primary"><i className="bi bi-shield-check"></i> Account</span>
                                </div>
                                <div className="card-body p-lg-4">
                                    {isLoading && <Skeleton count={5} />}

                                    {isError && !isLoading &&
                                        <div className="empty-state">
                                            <i className="bi bi-exclamation-triangle"></i>
                                            <p>Unable to load address details right now.</p>
                                        </div>
                                    }

                                    {!isLoading && !isError && accountAddress && !exists &&
                                        <div className="empty-state">
                                            <i className="bi bi-wallet2"></i>
                                            <p>Address not found!</p>
                                        </div>
                                    }

                                    {hasAccountData &&
                                        <>
                                            <div className="detail-row">
                                                <div className="detail-label">Address</div>
                                                <div className="detail-value hash-mono text-break">{accountAddress}</div>
                                            </div>
                                            <div className="detail-row">
                                                <div className="detail-label">Balance</div>
                                                <div className="detail-value"><strong>{formatAmount(balance)}</strong>&nbsp;UKSC</div>
                                            </div>
                                            <div className="detail-row">
                                                <div className="detail-label">Validated</div>
                                                <div className="detail-value"><strong>{numBlockValidate}</strong>&nbsp;block(s)</div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>

                            {hasAccountData &&
                                <>
                                    <br />
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                                                <ul className="nav nav-tabs mb-0">
                                                    <li className="nav-item">
                                                        <a onClick={() => handleClick('txns')} className={txnsClass} style={{ cursor: 'pointer' }}>Transactions</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a onClick={() => handleClick('blocks')} className={blocksClass} style={{ cursor: 'pointer' }}>Validated Block</a>
                                                    </li>
                                                </ul>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => {
                                                        if (!transactions || transactions.length === 0) return;
                                                        const headers = ['TxHash', 'Height', 'Timestamp', 'Sender', 'Recipient', 'Amount', 'Fee'];
                                                        const rows = transactions.map((t: any) => [
                                                            t.hash,
                                                            t.height,
                                                            t.time_stamp,
                                                            t.sender,
                                                            t.recipient,
                                                            t.amount,
                                                            t.fee,
                                                        ]);
                                                        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                                                        const encodedUri = encodeURI(csvContent);
                                                        const link = document.createElement('a');
                                                        link.setAttribute('href', encodedUri);
                                                        link.setAttribute('download', `tx_history_${address}.csv`);
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    }}>
                                                    <i className="bi bi-file-arrow-down me-1"></i>Export CSV
                                                </button>
                                            </div>

                                            {activeNav === 'txns' ? (
                                                hasTransactions ? (
                                                    <TableAccountTxns transactions={transactions} />
                                                ) : (
                                                    <div className="empty-state mt-4">
                                                        <i className="bi bi-receipt"></i>
                                                        <p>No transactions were found for this address.</p>
                                                    </div>
                                                )
                                            ) : (
                                                hasBlocks ? (
                                                    <TableAccountBlocks blocks={blocks} />
                                                ) : (
                                                    <div className="empty-state mt-4">
                                                        <i className="bi bi-kanban"></i>
                                                        <p>No validated blocks were found for this address.</p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            }
                        </div></div>
                </section>
            </main>
        </Layout>
    )
}
