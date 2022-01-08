import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import { useRouter } from 'next/router';
import styles from '../Detail.module.css'
import { timeAgo, toDate } from '../../../utils/util';
import { getBlock } from '../../../grpc/useFetch'
import Link from 'next/link';

export default function Block() {
  const router = useRouter()
  const { height } = router.query;


  const { block, isLoading, isError } = getBlock(height?.toString());
  if (isLoading) {
    return (
      <div className="container">
        <Header />
        Loading...
        <Footer />
      </div>)
  }
  if (isError) return <div className="container">Failed to load block</div>

  return (
    <div className="container">
      <Header />
      <div className={styles.title}><h5>Block #{block?.Height}</h5></div>
      <div className="card">

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
      <Footer />
    </div>
  )
}

// Block.getInitialProps = async({ req }) => {
//   const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
//   return { userAgent }
// }
