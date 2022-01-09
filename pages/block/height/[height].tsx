import { useRouter } from 'next/router';
import Link from 'next/link';

// custom function
import { timeAgo, toDate } from '../../../utils/util';
import { getBlock } from '../../../grpc/useFetch';

// custom component
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import ErrorComp from '../../../components/status/ErrorComp';
import LoadingComp from '../../../components/status/LoadingComp';
import styles from '../Block.module.css';

export default function Block() {
  const router = useRouter()
  const { height } = router.query;


  const { block, isLoading, isError } = getBlock(height?.toString());

  
  if (isLoading) return  <LoadingComp />
  if (isError) return <ErrorComp />

  return (
    <>
      <Header />
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
                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Block Height </div>
                    <div className={`col-sm-8 ${styles.value}`}>{block.Height}</div>
                  </div>
                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Timestamp </div>
                    <div className={`col-sm-8 ${styles.value}`}>{timeAgo(block.TimeStamp)} ({toDate(block.TimeStamp)})</div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Transactions </div>
                    <div className={`col-sm-8 ${styles.value}`}>
                      <Link href={`/txns/block/${block.Height}`}>
                        <a className={styles.valueWithLink}>{block.NumOfTx} transaction(s) </a>
                      </Link>
                      in this block</div>
                  </div>


                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Validator</div>
                    <div className={`col-sm-8 ${styles.value}`}>
                      <Link href={`/address/${block.Validator}`}>
                        <a className={styles.valueWithLink}>{block.Validator}</a>
                      </Link>
                    </div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Block Reward</div>
                    <div className={`col-sm-8 ${styles.value}`}>{block.TotalReward}</div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Merkle Root </div>
                    <div className={`col-sm-8 ${styles.value}`}>{block.MerkleRoot}</div>
                  </div>


                  {/* <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">Difficulty</div>
            <div className={`col-sm-8 ${styles.value}`}>{block.Difficulty}</div>
          </div> */}

                  {/* <div className={`row ${styles.rowDiv}`}>
            <div className="col-sm-4">TotalAmount</div>
            <div className={`col-sm-8 ${styles.value}`}>{block.TotalAmount}</div>
          </div> */}


                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Hash </div>
                    <div className={`col-sm-8 ${styles.value}`}>{block.Hash}</div>
                  </div>

                  <div className={`row ${styles.rowDiv}`}>
                    <div className="col-sm-4">Prev. hash </div>
                    <div className={`col-sm-8`}>
                      <Link href={`/block/hash/${block.PrevHash}`}>
                        <a className={styles.valueWithLink}>{block.PrevHash}</a>
                      </Link>
                    </div>
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
