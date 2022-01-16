import { useRouter } from 'next/router';
import Link from 'next/link';

// custom function
import { formatAmount, formatFee, timeAgo } from '../../../utils/util';
import { GetTxnsByHeight } from '../../../grpc/useFetch';

// custom component
import ErrorComp from '../../../components/status/ErrorComp';
import LoadingComp from '../../../components/status/LoadingComp';
import styles from './Block.module.css';
import Layout from '../../../components/Layout';

export default function Block() {
  const router = useRouter()
  const { height } = router.query;


  const { transactions, isLoading, isError } = GetTxnsByHeight(height?.toString());


  if (isLoading) return <LoadingComp />
  if (isError) return <ErrorComp />

  return (

    <Layout pageTitle="block by height">

      <main id="main" className="main">

        <div className="pagetitle">
          <h5>Transactions for Block {height}</h5>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/txns"><a>Transactions</a></Link>
              </li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">

                <div className="card-body">
                  <div className="card-title" />
                  <div className="row">
                    <div className="col d-flex justify-content-start">
                      <p>Showing last 50 transactions</p>
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
                          <th className={styles.tableHeader}>Value</th>
                          <th className={styles.tableHeader}>Fee</th>
                        </tr>
                      </thead>
                      <tbody>

                        {transactions?.map((tx) => (

                          <tr key={tx.Hash}>
                            <td>
                              <Link href={`/txn/${tx.Hash}`}><a><span className={styles.hashTx}>{tx.Hash.substring(0, 15)}...
                              </span></a></Link>
                            </td>
                            <td>

                              <Link href={`/block/height/${tx.Height}`}><a>
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
                </div>
              </div>

            </div></div>
        </section>
      </main>

    </Layout>

  )
}
