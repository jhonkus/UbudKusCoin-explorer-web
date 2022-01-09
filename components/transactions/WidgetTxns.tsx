import styles from './Txns.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getTxns } from '../../grpc/useFetch';
import { formatAmount, timeAgo } from '../../utils/util';
import tximg from '../../public/tx.png'

/**
 * 
 * @returns Widget component
 */
const WidgetTxns = () => {

  const { transactions, isLoading, isError } = getTxns();
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load transactions</div>

  return (
    <div className="card">
      <div className="card-header">
        <h6 className={styles.subTitle}>Latest Transactions</h6>
      </div>
      <div className="card-body">

        {transactions?.map((tx) => (
          <div className={`row ${styles.divRow}`} key={tx.Hash}>
            <div className="col-sm-1 align-self-center">
              <div className={styles.tx}>
                <Image src={tximg} alt="block icon" width="20" height="20" />
              </div>
            </div>
            <div className="col-sm-3  d-flex flex-column">
              <Link href={`/txn/${tx.Hash}`}><a><span className={styles.hashTx}>{tx.Hash.substring(0, 12)}...
              </span></a></Link>
              <span className={styles.dateTx}>{timeAgo(tx.TimeStamp)}</span>
            </div>
            <div className="col-sm-5">
              <div className="d-flex flex-column">
                <span className={styles.addrsLabel}>From&nbsp;&nbsp;
                  <span className={styles.addrs}>
                    <Link href={`/address/${tx.Sender}`}>
                      <a>
                        {tx.Sender.substring(0, 16)} ...
                      </a>
                    </Link></span>
                </span>
                <span className={styles.addrsLabel}>To&nbsp;&nbsp;
                  <span className={styles.addrs}>
                    <Link href={`/address/${tx.Recipient}`}>
                      <a>
                        {tx.Recipient.substring(0, 18)}...
                      </a>
                    </Link></span>
                </span>
              </div>
            </div>
            <div className="col-sm-3">
              <div className={styles.amount}>{formatAmount(tx.Amount)} Ukc </div>
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