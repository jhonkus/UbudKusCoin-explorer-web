import Link from 'next/link';
import { useRouter } from 'next/router';

// custom function
import { formatAmount, formatFee, timeAgo, toDate } from '../../utils/util';
import { useTxn } from '../../grpc/useFetch'

// custom components
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
          <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/txns', label: 'Transactions' }, { label: hash ? hash.slice(0, 12) + '…' : '' }]} />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card detail-card">
                <div className="card-body p-lg-4">

                  {(!txn && !isLoading && !isError) &&
                    <div className="empty-state">
                      <i className="bi bi-arrow-left-right"></i>
                      <p>Transaction not found!</p>
                    </div>
                  }
                  {(isLoading || isError) && <Skeleton count={15} />}
                  {txn &&

                    <>
                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The unique 64 character hash generated when the transaction was created.'} />Transaction Hash</div>
                        <div className="detail-value hash-mono">
                          {txn.Hash}
                          <CopyText msg="Copy TX hash to clipboard" text={txn.Hash} />
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'Height or number of the block in which the transaction recorded.'} />Block</div>
                        <div className="detail-value">
                          <Link href={`/blocks/height/${txn.Height}`} className="text-primary fw-semibold hash-mono">{txn.Height}</Link>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The status of the transaction.'} />Status</div>
                        <div className="detail-value">
                          <span className="status-badge success"><i className="bi bi-check-circle-fill"></i> Success</span>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The date and time at which a transaction is included onto block.'} />Timestamp</div>
                        <div className="detail-value"><i className="bi bi-clock text-muted"></i> {timeAgo(txn.TimeStamp)} ({toDate(txn.TimeStamp)})</div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The sender of the transaction.'} />From</div>
                        <div className="detail-value hash-mono">
                          <Link href={`/address/${txn.Sender}`} className="text-primary">{txn.Sender}</Link>
                          <CopyText msg="Copy from address to clipboard" text={txn.Sender} />
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The recipient of the transaction.'} />To</div>
                        <div className="detail-value hash-mono">
                          <Link href={`/address/${txn.Recipient}`} className="text-primary">{txn.Recipient}</Link>
                          <CopyText msg="Copy to address to clipboard" text={txn.Recipient} />
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The value being transacted in UKSC.'} />Value</div>
                        <div className="detail-value"><strong>{formatAmount(txn.Amount)}</strong>&nbsp;UKSC</div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'Amount paid to the validator when processing the transaction.'} />Transaction Fee</div>
                        <div className="detail-value"><strong>{formatFee(txn.Fee)}</strong>&nbsp;UKSC</div>
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
