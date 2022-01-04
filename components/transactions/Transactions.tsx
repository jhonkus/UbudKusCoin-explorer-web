import styles from './Transactions.module.css'
import Link from 'next/link'
import { useTransactions } from '../../services/useFetch';
import toDate from '../../utils/util';

/**
 * 
 * @returns Transactions component
 */
const Transactions = () => {

  const { transactions, isLoading, isError } = useTransactions();
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load transactions</div>

  return (
    <>
      <div className={styles.subTitle}><h5>Latest Transactions</h5></div>
      <table className="table">
        <tbody>

          {transactions?.map((tx) => (

            <tr key={tx.Hash}>
              <td><div className={styles.tx}>TX</div></td>
              <td>
                <Link href={`/transactions/${tx.Hash}`}><a><span className={styles.hashTx}>{tx.Hash.substring(0, 15)}...
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
    </>)
}

export default Transactions