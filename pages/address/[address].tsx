import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableAccountTxns from '../../components/account/TableAccountTxns';
import TableAccountBlocks from '../../components/account/TableAccountBlocks';
import styles from './Address.module.css'

import { getAccount } from '../../grpc/useFetch'
import { formatAmount } from '../../utils/util';
import LoadingComp from '../../components/status/LoadingComp';
import ErrorComp from '../../components/status/ErrorComp';


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

    if (isLoading) return <LoadingComp />
    if (isError) return <ErrorComp />

    return (

        <>
            <Header />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h5>Address <span className={`text-break ${styles.title}`}>{address}</span></h5>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>

                            <li className="breadcrumb-item">
                                <Link href="/blocks"><a>Blocks</a></Link>
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
                                    <div className={`row ${styles.rowDiv}`}>
                                        <div className="col-sm-2">Balance </div>
                                        <div className={`col-sm-9 ${styles.value}`}>{formatAmount(balance)}</div>
                                    </div>
                                    <div className={`row ${styles.rowDiv}`}>
                                        <div className="col-sm-2">Validated </div>
                                        <div className={`col-sm-9 ${styles.value}`}>{numBlockValidate}</div>
                                    </div>
                                </div>
                            </div>

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


                        </div></div>
                </section>
            </main>
            <Footer />
        </>
    )
}


