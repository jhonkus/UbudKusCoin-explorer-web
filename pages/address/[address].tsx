import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { useRouter } from 'next/router';
import styles from './Detail.module.css'
import { getAccount } from '../../grpc/useFetch'
import TableAccountTxns from '../../components/account/TableAccountTxns';
import { formatAmount } from '../../utils/util';
import TableAccountBlocks from '../../components/account/TableAccountBlocks';
import { useState } from 'react';


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
    if (isLoading) {
        return (
            <div className="container">
                <Header />
                Loading...
                <Footer />
            </div>)
    }
    if (isError) return <div className="container">Failed to load block</div>

    return (
        <div className="container">
            <Header />

            <div className={styles.title}><h5>Address <span className={styles.address}>{address}</span></h5></div>

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

            <br /><br />

            <div className="card">

                <div className="card-body">


                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a onClick={() => handleClick('txns')} className={txnsClass} href="#">Transactions</a>
                        </li>
                        <li onClick={() => handleClick('blocks')} className={blocksClass}>
                            <a className="nav-link" href="#">Validated Block</a>
                        </li>
                    </ul>

                    {activeNav === 'txns' ? <TableAccountTxns transactions={transactions} /> :
                        <TableAccountBlocks blocks={blocks} />
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}


