import Link from 'next/link';
import { useRouter } from 'next/router';

// custom function
import { formatAmount, formatFee, timeAgo, toDate } from '../../utils/util';
import { getTxn } from '../../grpc/useFetch'

// custom compoents
import styles from './Txn.module.css';
import Layout from '../../components/Layout'
import Skeleton from 'react-loading-skeleton';
import CopyText from '../../components/copy/copy_text';
import HelpTips from '../../components/helptips/help';


export default function TxnByHash() {
  const router = useRouter()
  const { hash } = router.query;

  const { txn, isLoading, isError } = getTxn(hash?.toString());
  // if (isLoading) return <LoadingComp />
  // if (isError) return <ErrorComp />
  // if (!txn) return <NotFound />

  return (
    <Layout pageTitle="Transaction by Hash">
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

                  {(!txn && !isLoading && !isError) &&
                    <div className="text-center"><p>Transaction not found! </p></div>
                  }
                  {(isLoading || isError) && <Skeleton count={15} />}
                  {txn &&

                    <>
                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'TraThe date and time at wwhich a block created.'} />
                          Transaction Hash</div>
                        <div className={`col-sm-8 ${styles.value}`}>{txn.Hash} <CopyText msg={'Copy TX hash to clipboard'} text={txn.Hash} /></div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={' '} />
                          Block</div>
                        <div className={`col-sm-8`}>
                          <Link href={`/blocks/height/${txn.Height}`}>
                            <a className={styles.valueWithLink}>{txn.Height}</a>
                          </Link>
                        </div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={' '} />
                          Status</div>
                        <div className={`col-sm-8 ${styles.success}`}><i className="bi bi-check-circle-fill"></i> Success</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={' '} />
                          Timestamp</div>
                        <div className={`col-sm-8 ${styles.value}`}><i className="bi bi-clock"></i> {timeAgo(txn.TimeStamp)} ({toDate(txn.TimeStamp)})</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={' '} />
                          From</div>
                        <div className={`col-sm-8`}>
                          <Link href={`/address/${txn.Sender}`}>
                            <a className={styles.valueWithLink}>{txn.Sender}</a>
                          </Link> <CopyText msg={'Copy from address to clipboard'} text={txn.Sender} />
                        </div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={' '} />
                          To</div>
                        <div className={`col-sm-8`}>
                          <Link href={`/address/${txn.Recipient}`}>
                            <a className={styles.valueWithLink}>{txn.Recipient}</a>
                          </Link> <CopyText msg={'Copy to address to clipboard'} text={txn.Recipient} />
                        </div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={' '} />
                          Value</div>  <div className={`col-sm-8 ${styles.value}`}>{formatAmount(txn.Amount)} Ukusi </div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={' '} />
                          Transaction Fee</div>  <div className={`col-sm-8 ${styles.value}`}>{formatFee(txn.Fee)} Ukusi </div>
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

TxnByHash.getInitialProps = async({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}
