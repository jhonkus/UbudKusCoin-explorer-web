import Skeleton from 'react-loading-skeleton';
import { formatNum, formatTotalTxns } from '../../utils/util';
import Link from 'next/link';
import styles from './InfoDashboard.module.css';
import HelpTips from '../helptips/help';


const TotalTxns = ({ data, isLoading }) => {

    return (
        <div className="col-xxl-3 col-md-3">
            <div className="card info-card revenue-card">


                <div className="card-body">
                    <h5 className="card-title">
                        <Link href={`/txns`}>
                            <a className={styles.titlebig}>
                                Transactions</a>
                        </Link> <HelpTips tips={'Total transaction since begining. TPS is transaction per second for last 30 seconds.'} />
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="text-muted small bi bi-arrow-down-up"></i>
                        </div>
                        <div className="ps-3">
                            {
                                isLoading ? <div style={{ width: '100px' }}><Skeleton count={2} /> </div> : <>
                                    <h6 style={{ fontSize: '1.2em' }}>{formatNum(data?.NumTxns)}           <span style={{ fontSize: '0.7em' }} className="text-muted small pt-2 ps-1">Tx</span></h6>
                                    <span style={{ fontSize: '0.7em' }} className="text-dark small pt-1 fw-bold">({formatTotalTxns(data?.Tps)} </span>
                                    <span style={{ fontSize: '0.7em' }} className="text-muted small pt-2 ps-1">TPS)</span>

                                </>
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default TotalTxns
