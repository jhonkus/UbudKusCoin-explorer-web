import Link from 'next/link'
import { usePendingTxns } from '../../grpc/useFetch';
import { timeAgo, formatAmount, formatFee, truncateText } from '../../utils/util';
import styles from './Txns.module.css'
import Skeleton from 'react-loading-skeleton';


/**
 * 
 * @returns Transactions component
 */
const TablePendingTxns = ({ page = 1 }) => {
  const { transactions, isLoading, isError } = usePendingTxns();

  return (

    <div className="card">

      <div className="card-body">
        <div className="card-title" />

        {(!isLoading && !isError && transactions.length === 0) &&
          <div className="text-center text-muted py-4"><p>No pending transactions.</p></div>
        }
        {isLoading && <Skeleton count={10} />}
        {isError && <div className="text-center text-danger py-4"><p>Unable to load the transaction pool.</p></div>}
        {!isLoading && !isError && transactions.length > 0 &&

          <>

            <div className="row">
              <div className="col d-flex justify-content-start">
                <p>Number of pending transactions : <strong>{transactions?.length}</strong></p>
              </div>
              <div className="col d-flex justify-content-end">
                <p>Auto update every <strong>5</strong> seconds</p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Txn Hash</th>
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
                        <span className={styles.hashTx}>{truncateText(tx.Hash, 15)}
                        </span>
                      </td>
                      <td>
                        <span className={styles.dateTx}>{timeAgo(tx.TimeStamp)}</span>
                      </td>
                      <td className={styles.address}>
                        <Link href={`/address/${tx.Sender}`}>
                          <span className={styles.addrsInTable}>
                            {truncateText(tx.Sender, 20)}
                          </span>
                        </Link>
                      </td>
                      <td>
                        <Link href={`/address/${tx.Recipient}`}>
                          <span className={styles.addrsInTable}>
                            {truncateText(tx.Recipient, 20)}
                          </span>
                        </Link>
                      </td>
                      <td>
                        <div className={styles.amountInTable}>{formatAmount(tx.Amount)} UKC</div>
                      </td>
                      <td>
                        <div className={styles.amountInTable}>{formatFee(tx.Fee)} UKC</div>
                      </td>
                    </tr>

                  ))}

                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-end">

              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default TablePendingTxns
