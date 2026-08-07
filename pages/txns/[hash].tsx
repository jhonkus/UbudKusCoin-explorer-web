import Link from 'next/link';
import { useRouter } from 'next/router';

// custom function
import { formatAmount, formatFee, timeAgo, toDate } from '../../utils/util';
import { useTxn } from '../../grpc/useFetch'

// custom components
import styles from './Txn.module.css';
import Layout from '../../components/Layout'
import Breadcrumb from '../../components/Breadcrumb';
import Skeleton from 'react-loading-skeleton';
import CopyText from '../../components/copy/copy_text';
import HelpTips from '../../components/helptips/help';


function TxnByHash() {
  const router = useRouter()
  const { hash } = router.query;

  const { txn, isLoading, isError } = useTxn(hash?.toString());

  return (
    <Layout pageTitle="Transaction by Hash">
      <main id="main" className="main">

<div className="pagetitle">
          <h5>Transaction Details</h5>
          <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/txns', label: 'Transactions' }]} />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-title" />
                <div className="card-body">

                  {(!txn && !isLoading && !isError) &&
                    <div className="text-center"><p>Transaction not found! </p></div>
                  }
                  {(isLoading || isError) && <Skeleton count={15} />}
                  {txn &&

                    <>
                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The unique 64 character that is generated with has function when transaction created.'} />
                          Transaction Hash</div>
                        <div className={`col-sm-8 ${styles.value}`}>{txn.Hash} <CopyText msg={'Copy TX hash to clipboard'} text={txn.Hash} /></div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'Height or number of the block in which the transaction recorded.'} />
                          Block</div>
                        <div className={`col-sm-8`}>
                          <Link href={`/blocks/height/${txn.Height}`} className={styles.valueWithLink}>{txn.Height}</Link>
                        </div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The status of the transaction.'} />
                          Status</div>
                        <div className={`col-sm-8 ${styles.success}`}><i className="bi bi-check-circle-fill"></i> Success</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The date and time at which a transaction is included onto block.'} />
                          Timestamp</div>
                        <div className={`col-sm-8 ${styles.value}`}><i className="bi bi-clock"></i> {timeAgo(txn.TimeStamp)} ({toDate(txn.TimeStamp)})</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The sender of the transaction.'} />
                          From</div>
                        <div className={`col-sm-8`}>
                          <Link href={`/address/${txn.Sender}`} className={styles.valueWithLink}>{txn.Sender}</Link> <CopyText msg={'Copy from address to clipboard'} text={txn.Sender} />
                        </div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The recipient of the transaction.'} />
                          To</div>
                        <div className={`col-sm-8`}>
                          <Link href={`/address/${txn.Recipient}`} className={styles.valueWithLink}>{txn.Recipient}</Link> <CopyText msg={'Copy to address to clipboard'} text={txn.Recipient} />
                        </div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The value being transacted in UKC.'} />
                          Value</div>  <div className={`col-sm-8 ${styles.value}`}>{formatAmount(txn.Amount)} UKC </div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'Amount paid to the validator when processing the transaction.'} />
                          Transaction Fee</div>  <div className={`col-sm-8 ${styles.value}`}>{formatFee(txn.Fee)} UKC </div>
                      </div>
                    </>
                  }

                </div>
              </div>

            </div></div>
        </section>
      </main>
    </Layout>
  )
}

export default TxnByHash;
