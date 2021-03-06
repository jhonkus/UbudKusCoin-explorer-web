import Link from 'next/link';
import { timeAgo, formatAmount } from '../../utils/util';
import styles from './WidgetBlock.module.css';
import Skeleton from 'react-loading-skeleton';
/**
 * Block component
 * @returns 
 * 
 */
const WidgetBlocks = ({ data, isLoading }) => {
  // const { blocks, isLoading, isError } = getBlocks(1, 10);

  // if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  // if (isError) return <div><p>Error when loading</p></div>

  return (
    <div className="card">
      <div className="card-header">
        <h6 className={styles.subTitle}>Latest Blocks</h6>
      </div>
      <div className="card-body">

        {(isLoading) && <Skeleton count={5} />}

        {data?.blocks?.map((block, idx) => (
          idx < 10 && <div className={`row ${styles.divRow}`} key={block.Height}>
            <div className="col-sm-1 align-self-center">
              <div className={styles.bk}>
                <i className="bi bi-receipt"></i>
                
              </div>
            </div>
            <div className="col-sm-3 d-flex flex-column">
              <Link href={`/blocks/height/${block.Height}`}>
                <a><span className={styles.heightBlock}>{block.Height}</span></a>
              </Link>
              <span className={styles.dateTx}>{timeAgo(block.TimeStamp)}</span>
            </div>
            <div className="col-sm-4 d-flex flex-column">
              <span className={styles.addrsLabel}>By <span className={styles.validator}>
                <Link href={`/address/${block.Validator}`}>
                  <a>
                    {block.Validator?.substring(0, 10)}...
                  </a>
                </Link>
              </span></span>
              <span>
                <Link href={`/txns/block/${block.Height}`}>
                  <a className={styles.numTnx}>
                    {block.NumOfTx} txns </a>
                </Link>
                <span className={styles.lblTx}> in block</span></span>
            </div>
            <div className="col-sm-4 align-self-center">
              <div className={`align-self-end ${styles.amount}`}>{formatAmount(block.TotalAmount)} <span style={{fontSize: '0.8em'}} className="text-muted">Uks</span></div>
            </div>
          </div>
        ))}

      </div>
      {data?.blocks && <div className="text-center">
        <Link href="/blocks"><a><span className={styles.viewall}>View all bloks</span></a></Link>
      </div>}
      <br/>
    </div>
  )
}

export default WidgetBlocks
