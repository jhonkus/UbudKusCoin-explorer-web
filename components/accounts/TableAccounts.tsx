import Link from 'next/link'
import styles from './Accounts.module.css'
import { timeAgo, formatAmount, formatNum } from '../../utils/util';
import { getAccounts } from '../../grpc/useFetch';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../paging/Pagination';


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
                {accounts.length < 25 ? <Pagination isLast={true} pageNum={page} url="accounts"/> :
                  <Pagination isLast={false} pageNum={page} url="accounts"/>
                }
              </div>
            </div>
            <div className="table-responsive">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Address</th>
                    <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Balance</th>
                    <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Txn Count</th>
                    <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Updated</th>
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
                      <td style={{ textAlign: 'right' }}>
                        <span className={styles.dateInTable}>{timeAgo(acc.last_update)}</span>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-end">
                {accounts.length < 25 ? <Pagination isLast={true} pageNum={page} url="accounts"/> :
                  <Pagination isLast={false} pageNum={page} url="accounts"/>
                }
              </div>
            </div>

          </>
        }
      </div>
    </div>
  )
}

export default TableAccounts
