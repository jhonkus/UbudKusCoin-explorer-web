import styles from './Acc.module.css'
import Link from 'next/link'
import { timeAgo, formatAmount, formatFee } from '../../utils/util';


/**
 * 
 * @returns Transactions component
 */
const TableAccountTxns = ({ transactions }) => {

  return (
    <>
      <br />
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className={styles.tableHeader}>Txn Hash</th>
              <th className={styles.tableHeader}>Block</th>
              <th className={styles.tableHeader}>Age</th>
              <th className={styles.tableHeader}>From</th>
              <th className={styles.tableHeader}>To</th>
              <th className={styles.tableHeader}>Value</th>
              <th className={styles.tableHeader}>Fee</th>
            </tr>
          </thead>
          <tbody>

            {transactions?.map((tx) => (

              <tr key={tx.Hash}>
                <td>
                  <Link href={`/txns/${tx.Hash}`}><a><span className={styles.hashTx}>{tx.Hash.substring(0, 15)}...
                  </span></a></Link>
                </td>
                <td>
                  <span className={styles.dateTx}>{tx.Height}</span>
                </td>
                <td>
                  <span className={styles.dateTx}>{timeAgo(tx.TimeStamp)}</span>
                </td>
                <td className={styles.address}>
                  <Link href={`/address/${tx.Sender}`}>
                    <a>
                      <span className={styles.addrsInTable}>{tx.Sender.substring(0, 15)}...</span>
                    </a>
                  </Link>
                </td>
                <td>
                  <Link href={`/address/${tx.Recipient}`}>
                    <a>
                      <span className={styles.addrsInTable}>
                        {tx.Recipient.substring(0, 15)}...</span>
                    </a>
                  </Link>
                </td>
                <td>
                  <div className={styles.amountInTable}>{formatAmount(tx.Amount)}</div>
                </td>
                <td>
                  <div className={styles.amountInTable}>{formatFee(tx.Fee)}</div>
                </td>
              </tr>

            ))}

          </tbody>
        </table>
      </div>

    </>)
}

export default TableAccountTxns