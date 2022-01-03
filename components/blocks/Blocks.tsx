import styles from './Blocks.module.css'
import useSwr from 'swr'
import Link from 'next/link'

/**
 * Block component
 * @returns 
 */
 const Blocks = () => {

    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data, error } = useSwr('/api/blocks', fetcher, { refreshInterval: 60000 })
    if (error) return <div>Failed to load blocks</div>
    if (!data) return <div>Loading...</div>
  
    return (
      <>
        <h5>Latest Blocks</h5>
        <table className={'table-table-striped'}>
          <tbody>
            {data.blocks.map((block) => (
              <tr key={block.Height}>
                <td>BK</td>
                <td className={styles.colWide}>
                  <Link href={`/blocks/${block.Height}`}><a> {block.Height} </a></Link><br />
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