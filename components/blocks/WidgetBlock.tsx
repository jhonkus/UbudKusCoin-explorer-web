import Link from 'next/link';
import { getBlocks } from '../../grpc/useFetch'
import { timeAgo, formatAmount } from '../../utils/util';
import styles from './WidgetBlock.module.css';
import Skeleton from 'react-loading-skeleton';
/**
 * Block component
 * @returns 
 * 
 */
const WidgetBlocks = () => {
  const { blocks, isLoading, isError } = getBlocks(1, 7);

  // if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  // if (isError) return <div><p>Error when loading</p></div>

  return (
    <div className="card">
      <div className="card-header">
        <h6 className={styles.subTitle}>Latest Blocks</h6>
      </div>
      <div className="card-body">

        {(isLoading || isError) && <Skeleton count={5} />}
        {/* {isError && <div><p>Error when loading</p></div>} */}
        {blocks?.map((block) => (
          <div className={`row ${styles.divRow}`} key={block.Height}>
            <div className="col-sm-1 align-self-center">
              <div className={styles.bk}>
                <i className="bi bi-box"></i>
              </div>
            </div>
            <div className="col-sm-3 d-flex flex-column">
              <Link href={`/blocks/height/${block.Height}`}>
                <a><span className={styles.heightBlock}>{block.Height}</span></a>
              </Link>
              <span className={styles.dateTx}>{timeAgo(block.TimeStamp)}</span>
            </div>
            <div className="col-sm-4 d-flex flex-column">
              <span className={styles.addrsLabel}>By: <span className={styles.validator}>
                <Link href={`/address/${block.Validator}`}>
                  <a>
                    {block.Validator?.substring(0, 16)}...
                  </a>
                </Link>
              </span></span>
              <span>
                <Link href={`/txns/block/${block.Height}`}>
                  <a className={styles.numTnx}>
                    {block.NumOfTx} txns </a>
                </Link>
                <span className={styles.lblTx}> in this block</span></span>
            </div>
            <div className="col-sm-4 align-self-center">
              <div className={`align-self-end ${styles.amount}`}>{formatAmount(block.TotalAmount)} Uks</div>
            </div>
          </div>
        ))}

      </div>
      {blocks && <div className="card-footer text-center">
        <Link href="/blocks"><a><span className={styles.viewall}>View all bloks</span></a></Link>
      </div>}
    </div>
  )
}

export default WidgetBlocks
