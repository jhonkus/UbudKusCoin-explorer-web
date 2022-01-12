import Link from 'next/link';
import { getBlocks } from '../../grpc/useFetch'
import { timeAgo, formatAmount } from '../../utils/util';
import ErrorComp from '../status/ErrorComp';
import LoadingComp from '../status/LoadingComp';
import styles from './Blocks.module.css';

/**
 * Block component
 * @returns 
 */
const WidgetBlocks = () => {
  const { blocks, isLoading, isError } = getBlocks(1, 10);

  if (isLoading) return <LoadingComp />
  if (isError) return <ErrorComp />

  return (
    <div className="card">
      <div className="card-header">
        <h6 className={styles.subTitle}>Latest Blocks</h6>
      </div>
      <div className="card-body">

        {blocks.map((block) => (
          <div className={`row ${styles.divRow}`} key={block.Height}>
            <div className="col-sm-1 align-self-center">
              <div className={styles.bk}>
                <i className="bi bi-box"></i>
              </div>
            </div>
            <div className="col-sm-3 d-flex flex-column">
              <Link href={`/block/height/${block.Height}`}>
                <a><span className={styles.heightBlock}>{block.Height}</span></a>
              </Link>
              <span className={styles.dateTx}>{timeAgo(block.TimeStamp)}</span>
            </div>
            <div className="col-sm-5 d-flex flex-column">
              <span className={styles.validatorLabel}>Block maker : <span className={styles.validator}>
                <Link href={`/address/${block.Validator}`}>
                  <a>
                    {block.Validator?.substring(0, 16)}...
                  </a>
                </Link>
              </span></span>
              <span className={styles.numTx}>
                <Link href={`/txns/block/${block.Height}`}>
                  <a className={styles.valueWithLink}>
                  {block.NumOfTx} txns </a>
                </Link>
                <span className={styles.lblTx}> in this block</span></span>
            </div>
            <div className="col-sm-3 align-self-center">
              <div className={`align-self-end ${styles.amount}`}>{formatAmount(block.TotalAmount)} Ukc</div>
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
