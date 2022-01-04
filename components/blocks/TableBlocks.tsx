import styles from './Blocks.module.css'
import Link from 'next/link'
import { useBlocks } from '../../services/useFetch'
import toDate from '../../utils/util';


/**
 * Block component
 * @returns 
 */
const TableBlocks = () => {
  const { blocks, isLoading, isError } = useBlocks();
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load blocks</div>
  return (
    <>
      <div className={styles.tableTitle}>
        <h3>Blocks</h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Block</th>
            <th scope="col">Time Stamp</th>
            <th scope="col">Miner</th>
            <th scope="col">Num Of Tx</th>
            <th scope="col">Value</th>
            <th scope="col">Reward</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.Height}>
              <td>
                <Link href={`/blocks/${block.Height}`}>
                  <a><span className={styles.heightBlock}>{block.Height}</span></a>
                </Link>
              </td>
              <td>
                <span className={styles.dateTx}>{toDate(block.TimeStamp)}</span>
              </td>
              <td>
                <span className={styles.validator}>{block.Validator?.substring(0, 20)} ...</span>
              </td>
              <td>
                <span className={styles.numTx}>{block.NumOfTx} </span><span className={styles.lblTx}>txns</span>
              </td>
              <td>
                <div className={styles.amount}>{block.TotalAmount} Ukc
                </div></td>
              <td>
                <div className={styles.amount}>{block.TotalReward} Ukc
                </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">First</a></li>
          <li className="page-item"><a className="page-link" href="#">Prev</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
          <li className="page-item"><a className="page-link" href="#">Last</a></li>
        </ul>
      </nav>
    </>
  )
}

export default TableBlocks
