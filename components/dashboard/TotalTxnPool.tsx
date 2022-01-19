import { formatAmount, formatNum } from '../../utils/util';

const TotalTxnPool = ({ data }) => {
    return (
        <div className="col-xxl-3 col-md-3">
            <div className="card info-card customers-card">
                <div className="card-body">
                    <h5 className="card-title">Transaction Pool <span></span></h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="text-secondary bi bi-arrow-down-up"></i>
                        </div>
                        <div className="ps-3">
                            <h6>{formatNum(data?.NumPool)}</h6>
                            <span className="text-dark small pt-1 fw-bold">{formatAmount(data?.AmountPool)} <span className="text-muted small pt-2 ps-1">uks</span></span>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}
export default TotalTxnPool
