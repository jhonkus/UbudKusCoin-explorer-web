import { useRouter } from 'next/router';
import Link from 'next/link';

// custom function
import { formatAmount, formatFee, timeAgo, truncateText } from '../../../utils/util';
import { useTxnsByHeight } from '../../../grpc/useFetch';

// custom component
import styles from './Block.module.css';
import Layout from '../../../components/Layout';
import Skeleton from 'react-loading-skeleton';

export default function Block() {
  const router = useRouter()
  const { height } = router.query;


  const { transactions, isLoading, isError } = useTxnsByHeight(height?.toString());


  // if (isLoading) return <LoadingComp />
  // if (isError) return <ErrorComp />

  return (

    <Layout pageTitle="block by height">

      <main id="main" className="main">

        <div className="pagetitle">
          <h5>Transactions for Block {height}</h5>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/txns">Transactions</Link>
              </li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">

                  {(!transactions && !isLoading && !isError) &&
                    <div className="text-center"><p>Transaction(s) not found! </p></div>
                  }
                  {(isLoading || isError) && <div style={{ paddingTop: '10px' }}><Skeleton count={15} /></div>}

                  {transactions &&
                    <>
                      <div className="card-title" />
                      <div className="row">
                        <div className="col d-flex justify-content-start">
                          <p>Showing up to 300 transactions</p>
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
                                  <Link href={`/txns/${tx.Hash}`}><span className={styles.hashTx}>{truncateText(tx.Hash, 15)}
                                  </span></Link>
                                </td>
                                <td>

                                  <Link href={`/blocks/height/${tx.Height}`}>
                                    <span className={styles.hashTx}>{tx.Height}
                                    </span></Link>
                                </td>
                                <td>
                                  <span className={styles.dateInTable}>{timeAgo(tx.TimeStamp)}</span>
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
                                  <div className={styles.amountInTable}>{formatAmount(tx.Amount)} <span className="text-muted">UKSC</span></div>
                                </td>
                                <td>
                                  <div className={styles.amountInTable}>{formatFee(tx.Fee)} <span className="text-muted">UKSC</span></div>
                                </td>
                              </tr>

                            ))}

                          </tbody>
                        </table>
                      </div>

                    </>

                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </Layout>

  )
}
