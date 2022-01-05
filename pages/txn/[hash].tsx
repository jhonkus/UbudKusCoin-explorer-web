import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { useRouter } from 'next/router';
import styles from './Detail.module.css'
import toDate from '../../utils/util';
import { getTxn } from '../../grpc/useFetch'

export default function Txn() {
  const router = useRouter()
  const { hash } = router.query;
  console.log('TxnHash:',hash);

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
            <div className="col-sm-4">Transaction Hash</div>  <div className={`col-sm-8 ${styles.value}`}>{txn.Hash}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">Block height</div>  
            <div className={`col-sm-8 ${styles.value}`}>{txn.Height}</div>
          </div>
          
          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">Status</div>  
            <div className={`col-sm-8 ${styles.value}`}>{txn.Status}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">Type</div>  
            <div className={`col-sm-8 ${styles.value}`}>{txn.TxnType}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">TimeStamp</div>  <div className={`col-sm-8 ${styles.value}`}>{toDate(txn.TimeStamp)}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">From</div>  <div className={`col-sm-8 ${styles.value}`}>{txn.Sender}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">To</div>  <div className={`col-sm-8 ${styles.value}`}>{txn.Recipient}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">Value</div>  <div className={`col-sm-8 ${styles.value}`}>{txn.Amount}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">Transaction Fee</div>  <div className={`col-sm-8 ${styles.value}`}>{txn.Fee}</div>
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
