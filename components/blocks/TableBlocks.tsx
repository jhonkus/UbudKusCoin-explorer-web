import Link from 'next/link'
import styles from './Blocks.module.css'
import { timeAgo, formatAmount, formatFee } from '../../utils/util';
import { getBlocks } from '../../grpc/useFetch';
import Image from "next/image";
import loading from "../../public/loading.gif";


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
  const { blocks, isLoading, isError } = getBlocks(page, 25);

  if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  if (isError) return <div><p>Error when loading</p></div>

  
  return (
    <div className="card">

      <div className="card-body">
        <div className="card-title"/>
        <div className="row">
          <div className="col d-flex justify-content-start">
            <p>Showing 25 blocks</p>
          </div>
          <div className="col d-flex justify-content-end">
            <Pagination pageNum={page} />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table datatable">
            <thead>
              <tr>
                <th className={styles.tableHeader}>Block</th>
                <th className={styles.tableHeader}>Age</th>
                <th className={styles.tableHeader}>Txn</th>
                <th className={styles.tableHeader}>Creator</th>
                <th className={styles.tableHeader}>Value</th>
                <th className={styles.tableHeader}>Reward</th>
              </tr>
            </thead>
            <tbody>

              {blocks.map((block) => (
                <tr key={block.Height}>
                  <td>
                    <Link href={`/block/height/${block.Height}`}>
                      <a className={styles.heightBlock}>{block.Height}</a>
                    </Link>
                  </td>
                  <td>
                    <span className={styles.dateInTable}>{timeAgo(block.TimeStamp)}</span>
                  </td>
                  <td className={styles.numTxInTable}>
                    <span >{block.NumOfTx} </span>
                  </td>
                  <td>
                    <Link href={`/address/${block.Validator}`}>
                      <a className={styles.addrsInTable}>
                        {block.Validator?.substring(0, 20)}...
                      </a>
                    </Link>
                  </td>
                  <td>
                    <div className={styles.amountInTable}>{formatAmount(block.TotalAmount)} Ukuci </div>
                  </td>
                  <td>
                    <div className={styles.amountInTable}>{formatFee(block.TotalReward)}</div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <Pagination pageNum={page} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableBlocks
