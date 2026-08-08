import { useRouter } from 'next/router';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

// custom function
import { timeAgo, toDate, formatBytes, formatAmount, formatFee } from '../../../utils/util';
import { useBlock } from '../../../grpc/useFetch';

// custom component
import Layout from '../../../components/Layout';
import Breadcrumb from '../../../components/Breadcrumb';
import HelpTips from '../../../components/helptips/help';


export default function Block() {
  const router = useRouter()
  const { height } = router.query;

  const { block, isLast, isLoading, isError } = useBlock(height?.toString());

  let prev = (parseInt(height?.toString() || '0') - 1);
  prev = prev < 0 ? 0 : prev;
  const next = (parseInt(height?.toString() || '1') + 1);

  return (
    <Layout pageTitle="Block by height">
      <main id="main" className="main">

        <div className="pagetitle">
          <h5>Block <span className="hash-mono">#{block?.Height}</span></h5>
          <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/blocks', label: 'Blocks' }, { label: `Block ${block?.Height ?? ''}` }]} />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <div className="card detail-card">
                <div className="card-body p-lg-4">

                  {(!block && !isLoading && !isError) &&
                    <div className="empty-state">
                      <i className="bi bi-box"></i>
                      <p>Block not found or not yet created.</p>
                    </div>
                  }
                  {(isLoading || isError) && <Skeleton count={15} />}
                  {block &&
                    <>
                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'Block height also known as block number is length of blockchain.'} />Block Height</div>
                        <div className="detail-value">
                          {block.Height <= 1 ? "" :
                            <Link href={`/blocks/height/${prev}`} className="btn btn-sm btn-outline-secondary btn-icon-nav"><i className="bi bi-chevron-left"></i></Link>
                          }
                          <strong className="hash-mono">{block.Height}</strong>
                          {isLast ? "" :
                            <Link href={`/blocks/height/${next}`} className="btn btn-sm btn-outline-secondary btn-icon-nav"><i className="bi bi-chevron-right"></i></Link>
                          }
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The date and time at which this block was created.'} />Timestamp</div>
                        <div className="detail-value"><i className="bi bi-clock text-muted"></i> {timeAgo(block.TimeStamp)} ({toDate(block.TimeStamp)})</div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The number of transactions in the block.'} />Transactions</div>
                        <div className="detail-value">
                          <Link href={`/txns/block/${block.Height}`} className="text-primary fw-semibold">{block.NumOfTx} transaction(s)</Link>
                          &nbsp;in this block
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'Total amount of all transactions in this block.'} />Amount</div>
                        <div className="detail-value"><strong>{formatAmount(block.TotalAmount)}</strong>&nbsp;UKSC</div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The validator who successfully included this block on the blockchain.'} />Validator</div>
                        <div className="detail-value">
                          <Link href={`/address/${block.Validator}`} className="text-primary hash-mono">{block.Validator}</Link>
                          <span className="text-muted small">· built in {block.BuildTime} ms</span>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'For each block, the validator is rewarded with a finite amount of UKSC on top of transaction fees paid in the block.'} />Block Reward</div>
                        <div className="detail-value"><strong>{formatFee(block.TotalReward)}</strong>&nbsp;UKSC</div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The hash of all the hashes of all the transactions that are part of a block.'} />Merkle Root</div>
                        <div className="detail-value hash-mono">{block.MerkleRoot}</div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'Total bytes of the block.'} />Size</div>
                        <div className="detail-value">{formatBytes(block.Size)} bytes</div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The hash of the block header of this block.'} />Hash</div>
                        <div className="detail-value hash-mono">{block.Hash}</div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-label"><HelpTips tips={'The hash of the previous block in the blockchain.'} />Prev. hash</div>
                        <div className="detail-value">
                          <Link href={`/blocks/hash/${block.PrevHash}`} className="text-primary hash-mono">{block.PrevHash}</Link>
                        </div>
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
