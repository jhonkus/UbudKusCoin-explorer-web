import { useRouter } from 'next/router';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

// custom function
import { timeAgo, toDate, formatBytes, formatAmount, formatFee } from '../../../utils/util';
import { useBlock } from '../../../grpc/useFetch';

// custom component
import styles from '../Block.module.css';
import Layout from '../../../components/Layout';
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
          <h5>Block <span className={styles.title}>#{block?.Height}</span></h5>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/blocks">Blocks</Link>
              </li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <div className="card">
                <h5 className="card-title"></h5>
                <div className="card-body">

                  {(!block && !isLoading && !isError) &&
                    <div className="text-center"><p>Block not found or not yet created.</p></div>
                  }
                  {(isLoading || isError) && <Skeleton count={15} />}
                  {block &&
                    <>
                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4"><HelpTips tips={'Block height also known as block number is length of blockchain.'} />Block Height </div>
                        <div className={`col-sm-8 ${styles.value}`}>



                          {block.Height <= 1 ? "" :
                            <Link href={`/blocks/height/${prev}`}><i className="bi bi-chevron-left"></i></Link>
                          }
                           &nbsp;&nbsp;<strong>{block.Height}</strong>&nbsp;&nbsp;
                          {
                            isLast ? "" :
                              <Link href={`/blocks/height/${next}`}><i className="bi bi-chevron-right"></i></Link>
                          }


                        </div>
                      </div>
                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The date and time at which this block was created.'} />
                          Timestamp </div>
                        <div className={`col-sm-8 ${styles.value}`}><i className="bi bi-clock"></i> {timeAgo(block.TimeStamp)} ({toDate(block.TimeStamp)})</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The number of transactions in the block.'} />
                          Transactions </div>
                        <div className={`col-sm-8 ${styles.value}`}>
                          <Link href={`/txns/block/${block.Height}`} className={styles.valueWithLink}>{block.NumOfTx} transaction(s) </Link>
                          in this block</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'Total amount of all transactions in this block.'} />
                          Amount</div>
                        <div className={`col-sm-8 ${styles.value}`}><strong>{formatAmount(block.TotalAmount)}</strong> UKC</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The validator who successfully included this block on the blockchain.'} />
                          Validator</div>
                        <div className={`col-sm-8 ${styles.value}`}>
                          <Link href={`/address/${block.Validator}`} className={styles.valueWithLink}>{block.Validator}</Link>
                          &nbsp;&nbsp; in {block.BuildTime} ms
                        </div>
                      </div>



                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'For each block, the validator is rewarded with a finite amount of UKC on top of transaction fees paid in the block.'} />
                          Block Reward</div>
                        <div className={`col-sm-8 ${styles.value}`}><strong>{formatFee(block.TotalReward)}</strong> UKC</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The hash of all the hashes of all the transactions that are part of a block.'} />
                          Merkle Root </div>
                        <div className={`col-sm-8 ${styles.value}`}>{block.MerkleRoot}</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'Total bytes of the block.'} />
                          Size</div>
                        <div className={`col-sm-8 ${styles.value}`}>{formatBytes(block.Size)} bytes</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The hash of the block header of this block.'} />
                          Hash </div>
                        <div className={`col-sm-8 ${styles.value}`}>{block.Hash}</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The hash of the previous block in the blockchain.'} /> Prev. hash </div>
                        <div className={`col-sm-8`}>
                          <Link href={`/blocks/hash/${block.PrevHash}`} className={styles.valueWithLink}>{block.PrevHash}</Link>
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
