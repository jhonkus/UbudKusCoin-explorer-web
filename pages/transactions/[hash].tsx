import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './TxnsDetail.module.css'
import toDate from '../../utils/util';

type RootState = ReturnType<typeof store.getState>;


export default function TransactionDetail() {
  const data = useSelector((state: RootState) => state.transactions);
  const router = useRouter()
  const { hash } = router.query;
  const [transaction, setTransaction] = useState(Object);

  useEffect(() => {
    const savedTx = data?.transactions?.find(({ Hash }) => Hash === hash);
    console.log('savedTx: ', savedTx);
    setTransaction(savedTx);
  }, [hash, data?.transactions]);

  if (!transaction) {
    return (<div>Please back </div>)
  }

  return (
    <div className='container'>
      <Header />
      <div className={styles.title}><h5>Transaction Details</h5></div>
      <div className="card">
       
        <div className="card-body">
          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Transaction Hash</div>  <div className={`col ${styles.scCol}`}> : {transaction.Hash}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Status</div>  <div className={`col ${styles.scCol}`}> : success</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">TimeStamp</div>  <div className={`col ${styles.scCol}`}> : {toDate(transaction.TimeStamp)}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">From</div>  <div className={`col ${styles.scCol}`}> : {transaction.Sender}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">To</div>  <div className={`col ${styles.scCol}`}> : {transaction.Recipient}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Value</div>  <div className={`col ${styles.scCol}`}> : {transaction.Amount}</div>
          </div>

          <div className={`row ${styles.rowDiv}`}>
            <div className="col-3">Transaction Fee</div>  <div className={`col ${styles.scCol}`}> : {transaction.Fee}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
