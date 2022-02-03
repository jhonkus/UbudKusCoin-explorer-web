import Skeleton from 'react-loading-skeleton';
import { formatTotalReward } from '../../utils/util';
import HelpTips from '../helptips/help';
import styles from './InfoDashboard.module.css';
import Link from 'next/link';

const TotalReward = ({ data, isLoading }) => {

    return (
        <div className="col-xxl-3 col-md-3">
            <div className="card info-card reward-card">

                <div className="card-body">
                    {/* <h5 className="card-title" style={{ fontSize: '0.9em', color: 'gray' }}>Total Rewards <HelpTips tips={'Total coins received by all validators as a reward for creating/validating blocks, taken from transaction fees.'} /><span> </span></h5> */}

                    <h5 className="card-title">
                        <span className={styles.titlebig}>
                            Rewards and &nbsp;
                        </span>
         
                        <Link href={`/accounts`}>
                            <a className={styles.titlebig}>
                                Accounts
                            </a>
                        </Link>
                        &nbsp;&nbsp;<HelpTips tips={'Rewards is total coins received by all validators as a reward for creating/validating blocks. \n Top accounts is list of account ordered by its balance.'} />
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="text-muted small bi bi-gem"></i>
                        </div>
                        <div className="ps-3">
                            {
                                isLoading ? <div style={{ width: '100px' }}><Skeleton count={2} /> </div> :

                                    <><span style={{ fontSize: '1.2em' }} className="text-success medium pt-1 fw-bold">{formatTotalReward(data?.AmountReward)} <span style={{ fontSize: '0.6em' }} className="text-muted small pt-2 ps-1">Uks</span></span>
                                        <br />
                                        {/* <span className="text-muted small pt-2 ps-1">10 Validator</span> */}
                                        <span className="text-muted small pt-2 ps-1">
                                            <Link href={`/accounts`}>
                                                <a className={styles.titlebig}>
                                                    Show All Accounts
                                                </a>
                                            </Link>
                                        </span>
                                    </>
                            }
                            {/* <h6>{formatAmount(data?.AmountReward)}</h6> */}


                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default TotalReward
