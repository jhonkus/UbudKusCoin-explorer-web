import { formatNum } from '../../utils/util';
import Skeleton from 'react-loading-skeleton';

const TotalBlocks = ({ data, isLoading }) => {

  return (
    <div className="col-xxl-3 col-md-3">

      <div className="card info-card customers-card">


        <div className="card-body">
          <h5 className="card-title">Total Blocks <span>| All the times</span></h5>

          <div className="d-flex align-items-center">

            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="text-secondary bi bi-box"></i>
            </div>
            <div className="ps-3">
              {
                isLoading ? <div style={{ width: '100px' }}><Skeleton count={2} /> </div> : <h6>{formatNum(data?.NumBloks)}</h6>
              }
               <span className="text-muted small pt-2 ps-1">bloks</span>

            </div>
          </div>


        </div>
      </div>

    </div>
  )
}
export default TotalBlocks
