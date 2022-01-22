import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Address.module.css'

import Layout from '../../components/Layout'
import TableAccountTxns from '../../components/account/TableAccountTxns';
import TableAccountBlocks from '../../components/account/TableAccountBlocks';
import { getAccount } from '../../grpc/useFetch'
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

    const { transactions, blocks, balance, numBlockValidate, isLoading, isError } = getAccount(address?.toString());

    // if (isLoading) return <LoadingComp />
    // if (isError) return <ErrorComp />

    return (
        <Layout pageTitle="Account Address">
            <main id="main" className="main">
                <div className="pagetitle">
                    <h5>Address <span className={`text-break ${styles.title}`}>{address}    <CopyText msg={'Copy address to clipboard'} text={address}/></span>
                 
                    </h5>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>

                            <li className="breadcrumb-item">
                                <Link href={`/address/${address}`}><a>Address</a></Link>
                            </li>
                        </ol>
                    </nav>
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

                                            <ul className="nav nav-tabs">
                                                <li className="nav-item">
                                                    <a onClick={() => handleClick('txns')} className={txnsClass}>Transactions</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a onClick={() => handleClick('blocks')} className={blocksClass}>Validated Block</a>
                                                </li>
                                            </ul>

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


