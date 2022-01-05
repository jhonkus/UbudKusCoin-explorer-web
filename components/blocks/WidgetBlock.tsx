import styles from './Blocks.module.css'
import Link from 'next/link'
import { getBlocks } from '../../grpc/useFetch'
import toDate from '../../utils/util';


/**
 * Block component
 * @returns 
 */
const WidgetBlocks = () => {
  const { blocks, isLoading, isError } = getBlocks(1, 10);
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load blocks</div>
  return (
    <div className="card">
      <div className="card-header">
        <div className={styles.subTitle}>
          <h6>Latest Blocks</h6>
        </div>
      </div>
      <div className="card-body">

        {blocks.map((block) => (
          <div className={`row ${styles.divRow}`} key={block.Height}>
            <div className="col-sm-1 align-self-center">
              <div className={styles.bk}>BK</div>
            </div>
            <div className="col-sm-3 d-flex flex-column">
              <Link href={`/block/${block.Height}`}>
                <a><span className={styles.heightBlock}>{block.Height}</span></a>
              </Link>
              <span className={styles.dateTx}>{toDate(block.TimeStamp)}</span>
            </div>
            <div className="col-sm-5 d-flex flex-column">
              <span className={styles.validatorLabel}>Created by : <span className={styles.validator}>{block.Validator?.substring(0, 16)}...</span></span>
              <span className={styles.numTx}>{block.NumOfTx} <span className={styles.lblTx}>txns</span></span>
            </div>
            <div className="col-sm-3 align-self-center">
              <div className={`align-self-end ${styles.amount}`}>{block.TotalAmount} Ukc</div>
            </div>
          </div>
        ))}

      </div>
      <div className="card-footer text-center">
        <Link href="/blocks"><a><span className={styles.viewall}>View all bloks</span></a></Link>
      </div>
    </div>
  )
}

export default WidgetBlocks
