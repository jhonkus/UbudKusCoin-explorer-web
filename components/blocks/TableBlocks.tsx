import styles from './Blocks.module.css'
import Link from 'next/link'
import toDate from '../../utils/util';
import { useBlocks } from '../../services/useFetch';


const Pagination = ({ pageNum = 1 }) => {
  return (
    <nav aria-label="block paging">
      <ul className="pagination">
        {/* <li className="page-item"><a className="page-link" href={`/blocks?page=1`}>First</a></li> */}
        <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum - 1}`}>Prev</a></li>
        <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum}`}>{pageNum}</a></li>
        <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 1}`}>{pageNum + 1}</a></li>
        <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 2}`}>{pageNum + 2}</a></li>
        <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 3}`}>{pageNum + 3}</a></li>
        <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 4}`}>{pageNum + 4}</a></li>
        <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 5}`}>Next</a></li>
        {/* <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 1}`}>Last</a></li> */}
      </ul>
    </nav>
  )
}
/**
 * Block component
 * @returns 
 */
const TableBlocks = ({ page = 1 }) => {
  const { blocks, isLoading, isError } = useBlocks(page, 25);
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load blocks</div>
  return (
    <>
      <div className={styles.tableTitle}>
        <h3>Blocks</h3>
      </div>
      <Pagination pageNum={page} />
      <div className="row">
        <div className="col-sm">Block</div>
        <div className="col-sm">Time Stamp</div>
        <div className="col-sm">Miner</div>
        <div className="col-sm">Num Of Tx</div>
        <div className="col-sm">Value</div>
        <div className="col-sm">Reward</div>
      </div>

      {blocks.map((block) => (
        <div className="row" key={block.Height}>

          <div className="col-sm">
            <Link href={`/blocks/${block.Height}`}>
              <a><span className={styles.heightBlock}>{block.Height}</span></a>
            </Link>
          </div>
          <div className="col-sm">
            <span className={styles.dateTx}>{toDate(block.TimeStamp)}</span>
          </div>
          <div className="col-sm">
            <span className={styles.validator}>{block.Validator?.substring(0, 20)}...</span>
          </div>
          <div className="col-sm">
            <span className={styles.numTx}>{block.NumOfTx} </span><span className={styles.lblTx}>txns</span>
          </div>
          <div className="col-sm">
            <div className={styles.amount}>{block.TotalAmount} Ukc
            </div></div>
          <div className="col-sm">
            <div className={styles.amount}>{block.TotalReward} Ukc
            </div></div>

        </div>
      ))}

      <Pagination pageNum={page} />
    </>
  )
}

export default TableBlocks
