import Link from 'next/link';
import { getTxns } from '../../grpc/useFetch';
import { formatAmount, timeAgo } from '../../utils/util';
import styles from './WidgetTxn.module.css';
import Skeleton from 'react-loading-skeleton'
/**
 * 
 * @returns Widget component
 */
const WidgetTxns = () => {

  const { transactions, isLoading, isError } = getTxns(1,7);
  // if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>

  return (
    <div className="card">
      <div className="card-header">
        <h6 className={styles.subTitle}>Latest Transactions</h6>
      </div>
      <div className="card-body">
        {(isLoading || isError) && <Skeleton count={6} />}
        {/* {isError && <div><p>Error when loading</p></div>} */}
        {transactions?.map((tx) => (
          <div className={`row ${styles.divRow}`} key={tx.Hash}>
            <div className="col-sm-1 align-self-center">
              <div className={styles.tx}>
                <i className="bi bi-arrow-down-up"></i>
              </div>
            </div>
            <div className="col-sm-3  d-flex flex-column">
              <Link href={`/txns/${tx.Hash}`}><a><span className={styles.hashTx}>{tx.Hash.substring(0, 10)}..
              </span></a></Link>
              <span className={styles.dateTx}>{timeAgo(tx.TimeStamp)}</span>
            </div>
            <div className="col-sm-5">
              <div className="d-flex flex-column">
                <span className={styles.addrsLabel}>From&nbsp;&nbsp;
                  <span className={styles.addrs}>
                    <Link href={`/address/${tx.Sender}`}>
                      <a>
                        {tx.Sender.substring(0, 10)} ...
                      </a>
                    </Link></span>
                </span>
                <span className={styles.addrsLabel}>To&nbsp;&nbsp;
                  <span className={styles.addrs}>
                    <Link href={`/address/${tx.Recipient}`}>
                      <a>
                        {tx.Recipient.substring(0, 10)}...
                      </a>
                    </Link></span>
                </span>
              </div>
            </div>
            <div className="col-sm-3">
              <div className={styles.amount}>{formatAmount(tx.Amount)} <span className="text-muted" style={{fontSize:'0.9em'}}>Uks</span> </div>
            </div>
          </div>

        ))}
      </div>
      {
        transactions &&
        <div className="text-center">
          <Link href="/txns"><a><span className={styles.viewall}>View all transactions</span></a></Link>
        </div>
      }
      <br/>
    </div>
  )
}

export default WidgetTxns