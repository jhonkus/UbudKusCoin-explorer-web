import Link from 'next/link';
import styles from './InfoDashboard.module.css';
import Skeleton from 'react-loading-skeleton';
import { formatAmount, formatNum } from '../../utils/util';
import HelpTips from '../helptips/help';

const TotalTxnPool = ({ data, isLoading }) => {
    return (
        <div className="col-xxl-3 col-md-3">
            <div className="card info-card pending-card">
                <div className="card-body">
                    <h5 className="card-title">
                        <Link href={`/txns/pending`}>
                            <a className={styles.title}>
                                Transaction Pool </a>
                        </Link>
                        <HelpTips tips={'The number of transactions that are in the queue to be processed for inclusion in the next block.'} />
                    </h5>

                    <div className="filter">
                        <div style={{ width: '30px', marginRight: '10px' }}>
                            <Skeleton />
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="text-muted small bi bi-clock-history"></i>
                        </div>
                        <div className="ps-3">
                            {
                                isLoading ? <div style={{ width: '100px' }}><Skeleton count={2} /> </div> :
                                    <>
                                        <h6>{formatNum(data?.NumPool)}&nbsp;<span className={styles.textSufix}>Tx</span>
                                        </h6>
                                        <span className={styles.infoSmall}>{formatAmount(data?.AmountPool)}
                                        &nbsp;<span className={styles.textSufix}>Uks</span></span>
                                    </>
                            }

                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}
export default TotalTxnPool
