import styles from './Blocks.module.css'
import Link from 'next/link'
import { useBlocks } from '../../services/useFetch'

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
      <h5>Latest Blocks</h5>
      <table className={'table-table-striped'}>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.Height}>
              <td>BK</td>
              <td className={styles.colWide}>
                <Link href={`/blocks/${block.Height}`}>
                  <a>{block.Height}</a>
                </Link>
                <br />
                {block.TimeStamp}
              </td>
              <td className={styles.address}>
                Validate by: <Link href={`/address/${block?.Validator}`}><a>{block.Validator?.substring(0, 10)}</a></Link>
                <br />
                {block.NumOfTx} txns
              </td>
              <td className={styles.colWide}>{block.TotalAmount} UKC</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Blocks
