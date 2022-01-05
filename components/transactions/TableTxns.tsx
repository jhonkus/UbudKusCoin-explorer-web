import styles from './Txns.module.css'
import Link from 'next/link'
import { getTxns } from '../../grpc/useFetch';
import toDate from '../../utils/util';

const Pagination = ({ pageNum = 1 }) => {
  return (
    <nav aria-label="block paging">
      <ul className="pagination">
        {/* <li className="page-item"><a className="page-link" href={`/blocks?page=1`}>First</a></li> */}
        <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum - 1}`}>Prev</a></li>
        <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum}`}>{pageNum}</a></li>
        <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 1}`}>{pageNum + 1}</a></li>
        <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 2}`}>{pageNum + 2}</a></li>
        <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 3}`}>{pageNum + 3}</a></li>
        <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 4}`}>{pageNum + 4}</a></li>
        <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 5}`}>Next</a></li>
        {/* <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 1}`}>Last</a></li> */}
      </ul>
    </nav>
  )
}

/**
 * 
 * @returns Transactions component
 */
const TableTxns = ({ page = 1 }) => {
  const { transactions, isLoading, isError } = getTxns(page, 25);
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load transactions</div>

  return (
    <>
      <div className={styles.tableTitle}><h5>Transactions</h5></div>

      <div className="card">

        <div className="card-body">
          <Pagination pageNum={page} />
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Txn Hash</th>
                  <th className={styles.tableHeader}>Time Stamp</th>
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
                      <span className={styles.dateTx}>{toDate(tx.TimeStamp)}</span>
                    </td>
                    <td className={styles.address}>
                      <span className={styles.addrsInTable}>{tx.Sender.substring(0, 15)}...</span>
                    </td>
                    <td>
                      <span className={styles.addrsInTable}>{tx.Recipient.substring(0, 15)}...</span></td>
                    <td>
                      <div className={styles.amountInTable}>{tx.Amount} Ukucin </div>
                    </td>
                    <td>
                      <div className={styles.amountInTable}>{tx.Fee.toFixed(8)}</div>
                    </td>
                  </tr>

                ))}

              </tbody>
            </table>
          </div>
          <Pagination pageNum={page} />
        </div></div>
    </>)
}

export default TableTxns