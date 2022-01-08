import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { useRouter } from 'next/router';
import styles from './Detail.module.css'
import { formatAmount, formatFee, timeAgo, toDate } from '../../utils/util';
import { getTxn } from '../../grpc/useFetch'
import Link from 'next/link';

export default function Txn() {
  const router = useRouter()
  const { hash } = router.query;

  const { txn, isLoading, isError } = getTxn(hash?.toString());
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load transaction</div>


  return (
    <div className="container">
      <Header />
      <div className={styles.title}><h5>Transaction Details</h5></div>
      <div className="card">

        <div className="card-body">
          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">Transaction Hash</div>
            <div className={`col-sm-8 ${styles.value}`}>{txn.Hash}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">Block</div>
            <div className={`col-sm-8`}>
              <Link href={`/block/${txn.Height}`}>
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

      <Footer />
    </div>
  )
}

Txn.getInitialProps = async({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}
