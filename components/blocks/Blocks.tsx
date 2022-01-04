import styles from './Blocks.module.css'
import Link from 'next/link'
import { useBlocks } from '../../services/useFetch'


function toDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const formattedTime = date.getDate() +
    "/" + (date.getMonth() + 1) +
    "/" + date.getFullYear() +
    " " + date.getHours() +
    ":" + date.getMinutes();
  return formattedTime;
}
/**
 * Block component
 * @returns 
 */
const Blocks = () => {
  const { blocks, isLoading, isError } = useBlocks();
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load blocks</div>
  return (
    <>
      <div className={styles.subTitle}>
        <h5>Latest Blocks</h5>
      </div>
      <table className="table">
        <tbody>
          {blocks.map((block) => (
            <tr key={block.Height}>
              <td>
                <div className={styles.bk}>BK</div>
              </td>
              <td>
                <Link href={`/blocks/${block.Height}`}>
                  <a><span className={styles.heightBlock}>{block.Height}</span></a>
                </Link>
                <br />
                <span className={styles.dateTx}>{toDate(block.TimeStamp)}</span>
              </td>
              <td>
                <span className={styles.validatorLabel}>Created by : </span><span className={styles.validator}>{block.Validator?.substring(0, 20)} ...</span>
                <br />
                <span className={styles.numTx}>{block.NumOfTx} </span><span className={styles.lblTx}>txns</span>
              </td>
              <td>
                <div className={styles.amount}>{block.TotalAmount} Ukc
                </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Blocks
