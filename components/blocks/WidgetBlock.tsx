import styles from './Blocks.module.css'
import Link from 'next/link'
import { useBlocks } from '../../services/useFetch'
import toDate from '../../utils/util';


/**
 * Block component
 * @returns 
 */
const WidgetBlocks = () => {
  const { blocks, isLoading, isError } = useBlocks(1, 10);
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load blocks</div>
  return (
    <>

      <div className="card">
        <div className="card-header">
          <div className={styles.subTitle}>
            <h5>Latest Blocks</h5>
          </div>
        </div>
        <div className="card-body">
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
        </div>
        <div className="card-footer text-center">
          <Link href="/blocks"><a>View all bloks</a></Link>
        </div>
      </div>
    </>
  )
}

export default WidgetBlocks
