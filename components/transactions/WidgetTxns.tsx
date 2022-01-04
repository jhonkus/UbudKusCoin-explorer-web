import styles from './Txns.module.css'
import Link from 'next/link'
import { useTxns } from '../../services/useFetch';
import toDate from '../../utils/util';

/**
 * 
 * @returns Transactions component
 */
const WidgetTxns = () => {

  const { transactions, isLoading, isError } = useTxns();
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load transactions</div>

  return (
    <div className="card">
      <div className="card-header">
        <div className={styles.subTitle}><h5>Latest Transactions</h5></div>
      </div>
      <div className="card-body">
        <table className="table">
          <tbody>
            {transactions?.map((tx) => (

              <tr key={tx.Hash}>
                <td><div className={styles.tx}>TX</div></td>
                <td>
                  <Link href={`/txns/${tx.Hash}`}><a><span className={styles.hashTx}>{tx.Hash.substring(0, 15)}...
                  </span></a></Link>
                  <br />
                  <span className={styles.dateTx}>{toDate(tx.TimeStamp)}</span>
                </td>
                <td className={styles.address}>
                  <span className={styles.addrsLabel}>From :</span> <span className={styles.addrs}>{tx.Sender.substring(0, 20)} ...</span>
                  <br />
                  <span className={styles.addrsLabel}>To :</span> <span className={styles.addrs}>{tx.Recipient.substring(0, 20)}...</span></td>
                <td>
                  <div className={styles.amount}>{tx.Amount} Ukc </div>
                </td>
              </tr>

            ))}

          </tbody>
        </table>
      </div>
      <div className="card-footer text-center">
        <Link href="/txns"><a>View all transactions</a></Link>
      </div>
    </div>
  )
}

export default WidgetTxns