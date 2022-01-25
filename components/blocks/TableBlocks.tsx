import Link from 'next/link'
import styles from './Blocks.module.css'
import { timeAgo, formatAmount, formatFee } from '../../utils/util';
import { getBlocks } from '../../grpc/useFetch';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../paging/Pagination';

/**
 * Block component
 * @returns 
 */
const TableBlocks = ({ page = 1 }) => {
  const { blocks, isLoading, isError } = getBlocks(page, 25);

  // if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  // if (isError) return <div><p>Error when loading</p></div>


  return (
    <div className="card">

      <div className="card-body">
        <div className="card-title" />
        {(!blocks && !isLoading && !isError) &&
          <div className="text-center"><p>Blocks not found! </p></div>
        }
        {(isLoading || isError) && <Skeleton count={10} />}
        {blocks &&

          <>

            <div className="row">
              <div className="col d-flex justify-content-start">
                <p>Showing 25 blocks</p>
              </div>
              <div className="col d-flex justify-content-end">

                {blocks.length < 25 ? <Pagination isLast={true} pageNum={page} url="blocks"/> :
                  <Pagination isLast={false} pageNum={page} url="blocks"/>
                }

              </div>
            </div>
            <div className="table-responsive">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Block</th>
                    <th className={styles.tableHeader}>Age</th>
                    <th className={styles.tableHeader}>Txns</th>
                    <th className={styles.tableHeader}>Validator</th>
                    <th className={styles.tableHeader} style={{textAlign:'right'}}>Value</th>
                    <th className={styles.tableHeader} style={{textAlign:'right'}}>Reward</th>
                  </tr>
                </thead>
                <tbody>

                  {blocks.map((block) => (
                    <tr key={block.Height}>
                      <td>
                        <Link href={`/blocks/height/${block.Height}`}>
                          <a className={styles.heightBlock}>{block.Height}</a>
                        </Link>
                      </td>
                      <td>
                        <span className={styles.dateInTable}>{timeAgo(block.TimeStamp)}</span>
                      </td>
                      <td className={styles.numTxInTable}>
                        <Link href={`/txns/block/${block.Height}`}>
                          <a className={styles.numTnx}>
                            <span >{block.NumOfTx}  txns</span>
                          </a>
                        </Link>
                      </td>
                      <td>
                        <Link href={`/address/${block.Validator}`}>
                          <a className={styles.addrsInTable}>
                            {block.Validator?.substring(0, 20)}...
                          </a>
                        </Link>
                      </td>
                      <td>
                        <div className={styles.amountInTable}><b>{formatAmount(block.TotalAmount)}</b> Ukusi </div>
                      </td>
                      <td>
                        <div className={styles.amountInTable}><b>{formatFee(block.TotalReward)}</b> Ukusi</div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-end">
                {blocks.length < 25 ? <Pagination isLast={true} pageNum={page} url="blocks"/> :
                  <Pagination isLast={false} pageNum={page} url="blocks"/>
                }
              </div>
            </div>

          </>
        }
      </div>
    </div>
  )
}

export default TableBlocks
