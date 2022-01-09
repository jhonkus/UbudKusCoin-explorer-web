import styles from './Blocks.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getBlocks } from '../../grpc/useFetch'
import { timeAgo, formatAmount } from '../../utils/util';
import bk from '../../public/bk.png'

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
        <h6 className={styles.subTitle}>Latest Blocks</h6>
      </div>
      <div className="card-body">

        {blocks.map((block) => (
          <div className={`row ${styles.divRow}`} key={block.Height}>
            <div className="col-sm-1 align-self-center">
              <div className={styles.bk}>
                <Image src={bk} alt="block icon" width="20" height="20"/>
              </div>
            </div>
            <div className="col-sm-3 d-flex flex-column">
              <Link href={`/block/height/${block.Height}`}>
                <a><span className={styles.heightBlock}>{block.Height}</span></a>
              </Link>
              <span className={styles.dateTx}>{timeAgo(block.TimeStamp)}</span>
            </div>
            <div className="col-sm-5 d-flex flex-column">
              <span className={styles.validatorLabel}>Validator : <span className={styles.validator}>
                <Link href={`/address/${block.Validator}`}>
                  <a>
                    {block.Validator?.substring(0, 16)}...
                  </a>
                </Link>
              </span></span>
              <span className={styles.numTx}>{block.NumOfTx} <span className={styles.lblTx}>txns</span></span>
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
