import styles from './Acc.module.css'
import Link from 'next/link'
import { timeAgo } from '../../utils/util';

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
                <Link href={`/block/height/${block.Height}`}>
                  <a><span className={styles.heightBlock}>{block.Height}</span></a>
                </Link>
              </td>
              <td>
                <span className={styles.dateTx}>{timeAgo(block.TimeStamp)}</span>
              </td>
              <td>
                <Link href={`/address/${block.Validator}`}>
                  <a>
                    <span className={styles.addrsInTable}>{block.Validator?.substring(0, 20)}...</span>
                  </a>
                </Link>
              </td>
              <td>
                <span className={styles.numTx}>{block.NumOfTx} </span><span className={styles.lblTx}>txns</span>
              </td>
              <td>
                <div className={styles.amountInTable}>{block.TotalAmount} Ukuin</div>
              </td>
              <td>
                <div className={styles.amountInTable}>{block.TotalReward.toFixed(8)}</div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default TableAccountBlocks;
