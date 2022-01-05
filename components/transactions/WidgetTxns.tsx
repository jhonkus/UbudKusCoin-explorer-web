import styles from './Txns.module.css'
import Link from 'next/link'
import { getTxns } from '../../grpc/useFetch';
import toDate from '../../utils/util';

/**
 * 
 * @returns Transactions component
 */
const WidgetTxns = () => {

  const { transactions, isLoading, isError } = getTxns();
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load transactions</div>

  return (
    <div className="card">
      <div className="card-header">
        <div className={styles.subTitle}><h6>Latest Transactions</h6></div>
      </div>
      <div className="card-body">

        {transactions?.map((tx) => (
          <div className={`row ${styles.divRow}`} key={tx.Hash}>

            <div className="col-sm-1 align-self-center">
              <div className={styles.tx}>TX</div>
            </div>
            <div className="col-sm-3  d-flex flex-column">
              <Link href={`/txns/${tx.Hash}`}><a><span className={styles.hashTx}>{tx.Hash.substring(0, 12)}...
              </span></a></Link>
              <span className={styles.dateTx}>{toDate(tx.TimeStamp)}</span>
            </div>
            <div className="col-sm-5">
              <div className="d-flex flex-column">
                <span className={styles.addrsLabel}>From&nbsp;&nbsp; 
                  <span className={styles.addrs}>{tx.Sender.substring(0, 16)} ...</span>
                </span>
                <span className={styles.addrsLabel}>To&nbsp;&nbsp;
                  <span className={styles.addrs}>{tx.Recipient.substring(0, 16)}...</span>
                </span>
              </div>
            </div>
            <div className="col-sm-3">
              <div className={styles.amount}>{tx.Amount} Ukc </div>
            </div>
          </div>

        ))}


      </div>
      <div className="card-footer text-center">
        <Link href="/txns"><a><span className={styles.viewall}>View all transactions</span></a></Link>
      </div>
    </div>
  )
}

export default WidgetTxns