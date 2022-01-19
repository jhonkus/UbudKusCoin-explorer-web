import { formatAmount } from '../../utils/util';
const TotalReward = ({ data }) => {

    return (
        <div className="col-xxl-3 col-md-3">
            <div className="card info-card sales-card">

                <div className="card-body">
                    <h5 className="card-title">Total Rewards <span>| Today</span></h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="text-muted small bi bi-currency-exchange"></i>
                        </div>
                        <div className="ps-3">
                            {/* <h6>{formatAmount(data?.AmountReward)}</h6> */}
                            <span className="text-success medium pt-1 fw-bold">{formatAmount(data?.AmountReward)}</span> <span className="text-muted small pt-2 ps-1">uks</span>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default TotalReward
