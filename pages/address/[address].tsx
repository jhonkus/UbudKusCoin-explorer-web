import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './Address.module.css'

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

    const [txnsClass, setTxnsClass] = useState('nav-link  active');
    const [blocksClass, setBlocksClass] = useState('nav-link');
    const [activeNav, setActiveNav] = useState('txns');

    const handleClick = (arg) => {
        setActiveNav(arg)
        if (arg === 'txns') {
            setTxnsClass('nav-link  active')
            setBlocksClass('nav-link ')

        } else {
            setBlocksClass('nav-link  active')
            setTxnsClass('nav-link ')
        }

    };

    const { transactions, blocks, balance, numBlockValidate, isLoading, isError } = useAccount(address?.toString());

    return (
        <Layout pageTitle="Account Address">
<main id="main" className="main">
                <div className="pagetitle">
                    <h5>Address <span className={`text-break ${styles.title}`}>{address}    <CopyText msg={'Copy address to clipboard'} text={address}/></span>
                 
                    </h5>
                    <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: `/address/${address}`, label: 'Address' }]} />
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    Overview
                                </div>
                                <div className="card-body">
                                    {(!balance && !isLoading && !isError) &&
                                        <div className="text-center"><p><br />Address not found! </p></div>
                                    }

                                    {(isLoading || isError) && <Skeleton count={15} />}
                                    {balance &&
                                        <>
                                            <div className={`row ${styles.rowDiv}`}>
                                                <div className="col-sm-2">Balance </div>
                                                <div className={`col-sm-9 ${styles.value}`}><strong>{formatAmount(balance)}</strong> Uks</div>
                                            </div>
                                            <div className={`row ${styles.rowDiv}`}>
                                                <div className="col-sm-2">Validated </div>
                                                <div className={`col-sm-9 ${styles.value}`}><strong>{numBlockValidate}</strong> block</div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>


                            {transactions &&
                                <>
                                    <br />
                                    <div className="card">

                                        <div className="card-body">

                                            <div className="card-title" />

                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <ul className="nav nav-tabs mb-0">
                                                    <li className="nav-item">
                                                        <a onClick={() => handleClick('txns')} className={txnsClass}>Transactions</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a onClick={() => handleClick('blocks')} className={blocksClass}>Validated Block</a>
                                                    </li>
                                                </ul>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
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
                                                    📥 Export CSV
                                                </button>
                                            </div>

                                            {activeNav === 'txns' ? <TableAccountTxns transactions={transactions} /> :
                                                <TableAccountBlocks blocks={blocks} />
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </div></div>
                </section>
            </main>
        </Layout >

    )
}


