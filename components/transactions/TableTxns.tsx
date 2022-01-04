import styles from './Txns.module.css'
import Link from 'next/link'
import { useTxns } from '../../services/useFetch';
import toDate from '../../utils/util';

/**
 * 
 * @returns Transactions component
 */
 const TableTxns = ({ page = 1 }) => {
  const { transactions, isLoading, isError } = useTxns(page, 25);
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load transactions</div>

  return (
    <>
      <div className={styles.tableTitle}><h3>Transactions</h3></div>

      <div className="card">

        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Txn Hash</th>
                <th scope="col">Time Stamp</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Value</th>
                <th scope="col">Fee</th>
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
                    <span className={styles.dateTx}>{toDate(tx.TimeStamp)}</span>
                  </td>
                  <td className={styles.address}>
                    <span className={styles.addrs}>{tx.Sender.substring(0, 20)} ...</span>
                  </td>
                  <td>
                    <span className={styles.addrs}>{tx.Recipient.substring(0, 20)}...</span></td>
                  <td>
                    <div className={styles.amount}>{tx.Amount} Ukc </div>
                  </td>
                  <td>
                    <div className={styles.amount}>{tx.Fee} Ukc </div>
                  </td>
                </tr>

              ))}

            </tbody>
          </table>
        </div></div>
    </>)
}

export default TableTxns