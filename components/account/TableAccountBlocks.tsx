import styles from './Acc.module.css'
import Link from 'next/link'
import { timeAgo, truncateText } from '../../utils/util';

/**
 * Block Account component
 * @returns 
 */
const TableAccountBlocks = ({ blocks }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className={styles.tableHeader}>Block</th>
            <th className={styles.tableHeader}>Age</th>
            <th className={styles.tableHeader}>Validator</th>
            <th className={styles.tableHeader}>Transactions</th>
            <th className={styles.tableHeader}>Value</th>
            <th className={styles.tableHeader}>Reward</th>
          </tr>
        </thead>
        <tbody>

          {blocks.map((block) => (
            <tr key={block.Height}>
              <td>
                <Link href={`/blocks/height/${block.Height}`}><span className={styles.heightBlock}>{block.Height}</span></Link>
              </td>
              <td>
                <span className={styles.dateTx}>{timeAgo(block.TimeStamp)}</span>
              </td>
              <td>
                <Link href={`/address/${block.Validator}`}>
                  <span className={styles.addrsInTable}>{truncateText(block.Validator, 20)}</span>
                </Link>
              </td>
              <td>
                <span className={styles.numTx}>{block.NumOfTx} </span><span className={styles.lblTx}>txns</span>
              </td>
              <td>
                <div className={styles.amountInTable}>{block.TotalAmount} UKSC</div>
              </td>
              <td>
                <div className={styles.amountInTable}>{Number(block.TotalReward).toFixed(8)} UKSC</div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default TableAccountBlocks;
