import Link from 'next/link'
import styles from './Accounts.module.css'
import { timeAgo, formatAmount, formatNum } from '../../utils/util';
import { getAccounts } from '../../grpc/useFetch';
import Skeleton from 'react-loading-skeleton';


const Pagination = ({ pageNum = 1 }) => {
  return (
    <nav aria-label="block paging">
      <ul className="pagination">
        {/* <li className="page-item"><a className="page-link" href={`/blocks?page=1`}>First</a></li> */}
        <li className="page-item"><a className="page-link" href={`/accounts?page=${pageNum - 1}`}>Prev</a></li>
        <li className="page-item"><a className="page-link" href={`/accounts?page=${pageNum}`}>{pageNum}</a></li>
        <li className="page-item"><a className="page-link" href={`/accounts?page=${pageNum + 1}`}>{pageNum + 1}</a></li>
        <li className="page-item"><a className="page-link" href={`/accounts?page=${pageNum + 2}`}>{pageNum + 2}</a></li>
        <li className="page-item"><a className="page-link" href={`/accounts?page=${pageNum + 3}`}>{pageNum + 3}</a></li>
        <li className="page-item"><a className="page-link" href={`/accounts?page=${pageNum + 4}`}>{pageNum + 4}</a></li>
        <li className="page-item"><a className="page-link" href={`/accounts?page=${pageNum + 5}`}>Next</a></li>
        {/* <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 1}`}>Last</a></li> */}
      </ul>
    </nav>
  )
}

/**
 * Block component
 * @returns 
 */
const TableAccounts = ({ page = 1 }) => {
  const { accounts, isLoading, isError } = getAccounts(page, 25);



  return (
    <div className="card">

      <div className="card-body">
        <div className="card-title" />
        {(!accounts && !isLoading && !isError) &&
          <div className="text-center"><p>Accounts not found! </p></div>
        }
        {(isLoading || isError) && <Skeleton count={10} />}
        {accounts &&

          <>

            <div className="row">
              <div className="col d-flex justify-content-start">
                <p>Showing 25 Accounts</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Pagination pageNum={page} />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Address</th>
                    <th className={styles.tableHeader} style={{textAlign:'right'}}>Balance</th>
                    <th className={styles.tableHeader} style={{textAlign:'right'}}>Txn Count</th>
                    <th className={styles.tableHeader} style={{textAlign:'right'}}>Updated</th>
                  </tr>
                </thead>
                <tbody>

                  {accounts.map((acc) => (
                    <tr key={acc.Id}>
                      <td>
                        <Link href={`/address/${acc.address}`}>
                          <a className={styles.heightBlock}>{acc.address}</a>
                        </Link>
                      </td>
                      <td>
                        <div className={styles.amountInTable}><b>{formatAmount(acc.balance)}</b> Ukusi </div>
                      </td>
                      <td>
                        <div className={styles.amountInTable}><b>{formatNum(acc.txn_count)}</b></div>
                      </td>
                      <td  style={{textAlign:'right'}}>
                        <span className={styles.dateInTable}>{timeAgo(acc.last_update)}</span>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-end">
                <Pagination pageNum={page} />
              </div>
            </div>

          </>
        }
      </div>
    </div>
  )
}

export default TableAccounts
