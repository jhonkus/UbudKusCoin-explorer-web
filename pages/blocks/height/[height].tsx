import { useRouter } from 'next/router';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

// custom function
import { timeAgo, toDate, formatBytes, formatAmount, formatFee } from '../../../utils/util';
import { getBlock } from '../../../grpc/useFetch';

// custom component
import styles from '../Block.module.css';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import HelpTips from '../../../components/helptips/help';


export default function Block() {
  const router = useRouter()
  const { height } = router.query;
  const [prevHeight, setPrevHeight] = useState(0);
  const [nextHeight, setNextHeight] = useState(0);

  const { block, isLoading, isError } = getBlock(height?.toString());

  let prev = (parseInt(height?.toString() || '0') - 1);
  prev = prev < 0 ? 0 : prev;
  const next = (parseInt(height?.toString() || '1') + 1);


  useEffect(() => {
    setPrevHeight(prev);
    setNextHeight(next);
  }, [next, prev])

  // if (isLoading) return <LoadingComp />
  // if (isError) return <ErrorComp />



  return (
    <Layout pageTitle="Block by height">
      <main id="main" className="main">

        <div className="pagetitle">
          <h5>Block <span className={styles.title}>#{block?.Height}</span></h5>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/blocks"><a>Blocks</a></Link>
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
                    <div className="text-center"><p>Block not found or net yet created! </p></div>
                  }
                  {(isLoading || isError) && <Skeleton count={15} />}
                  {block &&
                    <>
                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4"><HelpTips tips={'Block height also known as block number is length of blockchain.'} />Block Height </div>
                        <div className={`col-sm-8 ${styles.value}`}><strong>{block.Height}</strong>&nbsp;&nbsp;

                          {block.Height <= 1 ? <a><i className="bi bi-chevron-left"></i></a> : (
                            <Link href={`/blocks/height/${prevHeight}`}>
                              <a><i className="bi bi-chevron-left"></i></a>
                            </Link>
                          )

                          }

                          &nbsp;&nbsp;  &nbsp;&nbsp;
                          <Link href={`/blocks/height/${nextHeight}`}>
                            <a><i className="bi bi-chevron-right"></i></a>
                          </Link>
                        </div>
                      </div>
                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The date and time at wwhich a block created.'} />
                          Timestamp </div>
                        <div className={`col-sm-8 ${styles.value}`}><i className="bi bi-clock"></i> {timeAgo(block.TimeStamp)} ({toDate(block.TimeStamp)})</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The number of transactions in the block.'} />
                          Transactions </div>
                        <div className={`col-sm-8 ${styles.value}`}>
                          <Link href={`/txns/block/${block.Height}`}>
                            <a className={styles.valueWithLink}>{block.NumOfTx} transaction(s) </a>
                          </Link>
                          in this block</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'Total amount of all transactions in this block.'} />
                          Amount</div>
                        <div className={`col-sm-8 ${styles.value}`}><strong>{formatAmount(block.TotalAmount)}</strong> uks</div>
                      </div>

                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'The validator who successfuly include the block onto blockshain.'} />
                          Validator</div>
                        <div className={`col-sm-8 ${styles.value}`}>
                          <Link href={`/address/${block.Validator}`}>
                            <a className={styles.valueWithLink}>{block.Validator}</a>
                          </Link>
                          &nbsp;&nbsp; in {block.BuildTime} ms
                        </div>
                      </div>



                      <div className={`row ${styles.rowDiv}`}>
                        <div className="col-sm-4">
                          <HelpTips tips={'For each block, the validator is rewarded with a finite amount of Ukusi on top of the fees paid for all transactions in the block.'} />
                          Block Reward</div>
                        <div className={`col-sm-8 ${styles.value}`}><strong>{formatFee(block.TotalReward)}</strong> uks</div>
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
                          <Link href={`/blocks/hash/${block.PrevHash}`}>
                            <a className={styles.valueWithLink}>{block.PrevHash}</a>
                          </Link>
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
