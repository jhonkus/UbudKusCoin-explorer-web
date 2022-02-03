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
                            <a className={styles.title}>
                                Transactions</a>
                        </Link> <HelpTips tips={'Number of transactions since begining. TPS is transaction per second for last 30 seconds.'} />
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="text-muted small bi bi-arrow-down-up"></i>
                        </div>
                        <div className="ps-3">
                            {
                                isLoading ? <div style={{ width: '100px' }}><Skeleton count={2} /> </div> :
                                    <>
                                        <h6>
                                            {formatNum(data?.NumTxns)}
                                            &nbsp;<span className={styles.textSufix}>Tx</span>
                                        </h6>
                                        <span className={styles.infoSmall}>({formatTotalTxns(data?.Tps)} TPS)</span>
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
