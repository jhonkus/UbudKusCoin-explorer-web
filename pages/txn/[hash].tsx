import Link from 'next/link';
import { useRouter } from 'next/router';

// custom function
import { formatAmount, formatFee, timeAgo, toDate } from '../../utils/util';
import { getTxn } from '../../grpc/useFetch'

// custom compoents
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ErrorComp from '../../components/status/ErrorComp';
import LoadingComp from '../../components/status/LoadingComp';
import styles from './Txn.module.css';


export default function Txn() {
  const router = useRouter()
  const { hash } = router.query;

  const { txn, isLoading, isError } = getTxn(hash?.toString());
  if (isLoading) return  <LoadingComp />
  if (isError) return <ErrorComp />


  return (
    <>
      <Header />
      <main id="main" className="main">

        <div className="pagetitle">
          <h5>Transaction Details</h5>
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
                <div className="card-title" />
                <div className="card-body">
                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Transaction Hash</div>
                    <div className={`col-sm-8 ${styles.value}`}>{txn.Hash}</div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Block</div>
                    <div className={`col-sm-8`}>
                      <Link href={`/block/height/${txn.Height}`}>
                        <a className={styles.valueWithLink}>{txn.Height}</a>
                      </Link>
                    </div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Status</div>
                    <div className={`col-sm-8 ${styles.value}`}>{txn.Status}?</div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Timestamp</div>
                    <div className={`col-sm-8 ${styles.value}`}>{timeAgo(txn.TimeStamp)} ({toDate(txn.TimeStamp)})</div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">From</div>
                    <div className={`col-sm-8`}>
                      <Link href={`/address/${txn.Sender}`}>
                        <a className={styles.valueWithLink}>{txn.Sender}</a>
                      </Link>
                    </div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">To</div>
                    <div className={`col-sm-8`}>
                      <Link href={`/address/${txn.Recipient}`}>
                        <a className={styles.valueWithLink}>{txn.Recipient}</a>
                      </Link>
                    </div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Value</div>  <div className={`col-sm-8 ${styles.value}`}>{formatAmount(txn.Amount)} Ukuin</div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Transaction Fee</div>  <div className={`col-sm-8 ${styles.value}`}>{formatFee(txn.Fee)} Ukuin</div>
                  </div>
                </div>
              </div>

            </div></div>
        </section>
      </main>
      <Footer />
    </>

  )
}

Txn.getInitialProps = async({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}
