import { formatNum } from '../../utils/util';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import styles from './InfoDashboard.module.css';
import HelpTips from '../helptips/help';

const TotalBlocks = ({ data, isLoading }) => {

  return (
    <div className="col-xxl-3 col-md-3">

      <div className="card info-card customers-card">


        <div className="card-body">
          <h5 className="card-title">
            <Link href={`/blocks`}>
              <a className={styles.title}>
                Blocks</a>
            </Link>
            &nbsp;&nbsp;<HelpTips tips={'Number of blocks that created since begining. Block created constantly every 30 seconds. Top accounts ordered by its remaining balance.'} />
          </h5>

          <div className="d-flex align-items-center">

            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="text-secondary bi bi-receipt"></i>
            </div>
            <div className="ps-3">
              {
                isLoading ? <div style={{ width: '100px' }}><Skeleton count={2} /> </div> :
                  <> <h6>
                    {formatNum(data?.NumBloks)}&nbsp;<span className={styles.textSufix}>Bk</span>
                    </h6>
                    <span className={styles.infoSmall}>Block created every 30s</span>
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
