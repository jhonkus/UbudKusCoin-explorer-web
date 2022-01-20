import Skeleton from 'react-loading-skeleton';
import { formatAmount } from '../../utils/util';
const TotalReward = ({ data, isLoading }) => {

    return (
        <div className="col-xxl-3 col-md-3">
            <div className="card info-card sales-card">

                <div className="card-body">
                    <h5 className="card-title">Total Rewards <span>| 24h</span></h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="text-muted small bi bi-currency-exchange"></i>
                        </div>
                        <div className="ps-3">
                            {
                                isLoading ? <div style={{ width: '100px' }}><Skeleton count={2} /> </div> :
                               
                               <><span style={{fontSize:'1.5em'}}className="text-success medium pt-1 fw-bold">{formatAmount(data?.AmountReward)}</span> 
                                    <span className="text-muted small pt-2 ps-1">uks</span></>
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
