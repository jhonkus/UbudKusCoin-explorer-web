import styles from './Txns.module.css'
import Link from 'next/link'
import { useTransactions } from '../../services/useFetch';
import toDate from '../../utils/util';

/**
 * 
 * @returns Transactions component
 */
const TableTxns = () => {

  const { transactions, isLoading, isError } = useTransactions();
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
                    <Link href={`/transactions/${tx.Hash}`}><a><span className={styles.hashTx}>{tx.Hash.substring(0, 15)}...
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
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">First</a></li>
              <li className="page-item"><a className="page-link" href="#">Prev</a></li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
              <li className="page-item"><a className="page-link" href="#">Last</a></li>
            </ul>
          </nav>
        </div></div>
    </>)
}

export default TableTxns