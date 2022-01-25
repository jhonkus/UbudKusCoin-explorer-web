import { formatNum } from '../../utils/util';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import styles from './InfoDashboard.module.css';

const TotalBlocks = ({ data, isLoading }) => {

  return (
    <div className="col-xxl-3 col-md-3">

      <div className="card info-card customers-card">


        <div className="card-body">
          <h5 className="card-title">
            <Link href={`/blocks`}>
              <a className={styles.titlebig}>
                Blocks</a>
            </Link>
             &nbsp; and &nbsp; 
            <Link href={`/accounts`}>
              <a className={styles.titlebig}>
                Accounts
              </a>
            </Link>
          </h5>

          <div className="d-flex align-items-center">

            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="text-secondary bi bi-receipt"></i>
            </div>
            <div className="ps-3">
              {
                isLoading ? <div style={{ width: '100px' }}><Skeleton count={2} /> </div> :
                  <> <h6>
                    {formatNum(data?.NumBloks)}  <span style={{ fontSize: '0.5em' }} className="text-muted small pt-2 ps-1">bloks</span></h6>
                    <span className="text-muted small pt-2 ps-1">
                      <Link href={`/accounts`}>
                        <a className={styles.titlebig}>
                          TOP Accounts
                        </a>
                      </Link>
                    </span>
                  </>
              }


            </div>
          </div>


        </div>
      </div>

    </div>
  )
}
export default TotalBlocks
