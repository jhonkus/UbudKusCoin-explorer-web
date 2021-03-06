import Link from 'next/link'
import { getTxns } from '../../grpc/useFetch';
import { timeAgo, formatAmount, formatFee } from '../../utils/util';
import styles from './Txns.module.css'
import Skeleton from 'react-loading-skeleton';
import Pagination from '../paging/Pagination';


/**
 * 
 * @returns Transactions component
 */
const TableTxns = ({ page = 1 }) => {
  const { transactions, isLoading, isError } = getTxns(page, 25);
  // if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  // if (isError) return <div><p>Error when loading</p></div>

  return (

    <div className="card">

      <div className="card-body">
        <div className="card-title" />


        {(!transactions && !isLoading && !isError) &&
          <div className="text-center"><p>Blocks not found! </p></div>
        }
        {(isLoading || isError) && <Skeleton count={10} />}
        {transactions &&

          <>
            <div className="row">
              <div className="col d-flex justify-content-start">
                <p>Showing 25 transactions</p>
              </div>
              <div className="col d-flex justify-content-end">
                {transactions.length < 25 ? <Pagination isLast={true} pageNum={page} url="txns" /> :
                  <Pagination isLast={false} pageNum={page} url="txns" />
                }
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Txn Hash</th>
                    <th className={styles.tableHeader}>Block</th>
                    <th className={styles.tableHeader}>Age</th>
                    <th className={styles.tableHeader}>From</th>
                    <th className={styles.tableHeader}>To</th>
                    <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Value</th>
                    <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Fee</th>
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

                        <Link href={`/blocks/height/${tx.Height}`}><a>
                          <span className={styles.hashTx}>{tx.Height}
                          </span></a></Link>
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
                {transactions.length < 25 ? <Pagination isLast={true} pageNum={page} url="txns" /> :
                  <Pagination isLast={false} pageNum={page} url="txns" />
                }
              </div>

            </div>
          </>
        }
      </div>
    </div>
  )
}

export default TableTxns