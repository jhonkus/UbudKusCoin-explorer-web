import Link from 'next/link'
import { getPendingTxns } from '../../grpc/useFetch';
import { timeAgo, formatAmount, formatFee } from '../../utils/util';
import styles from './Txns.module.css'

import Image from "next/image";
import loading from "../../public/loading.gif";



/**
 * 
 * @returns Transactions component
 */
const TablePendingTxns = ({ page = 1 }) => {
  const { transactions, isLoading, isError } = getPendingTxns();
  if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  if (isError) return <div><p>Error when loading</p></div>

  return (

    <div className="card">

      <div className="card-body">
        <div className="card-title" />
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
                    <span className={styles.hashTx}>{tx.Hash.substring(0, 15)}...
                    </span>
                  </td>
                  <td>
                    <span className={styles.dateTx}>{timeAgo(tx.TimeStamp)}</span>
                  </td>
                  <td className={styles.address}>
                    <Link href={`/address/${tx.Sender}`}>
                      <a>
                        <span className={styles.addrsInTable}>
                          {tx.Sender.substring(0, 20)}...
                        </span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href={`/address/${tx.Recipient}`}>
                      <a>
                        <span className={styles.addrsInTable}>
                          {tx.Recipient.substring(0, 20)}...
                        </span>
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
        <div className="row">
          <div className="col d-flex justify-content-end">
      
          </div>
        </div>
      </div>
    </div>
  )
}

export default TablePendingTxns