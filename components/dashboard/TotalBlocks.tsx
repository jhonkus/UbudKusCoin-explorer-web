import { formatNum } from '../../utils/util';

const TotalBlocks = ({data, isLoading}) => {

    return (
        <div className="col-xxl-3 col-md-3">

        <div className="card info-card customers-card">


          <div className="card-body">
            <h5 className="card-title">Total Blocks <span>| All times</span></h5>

            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i className="text-secondary bi bi-box"></i>
              </div>
              <div className="ps-3">
                <h6>{formatNum(data?.NumBloks)}</h6>
                {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}

              </div>
            </div>
      

          </div>
        </div>

      </div>
    )
}
export default TotalBlocks
