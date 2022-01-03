import styles from './Transactions.module.css'
import useSwr from 'swr'
import Link from 'next/link'

/**
 * 
 * @returns Transactions component
 */
 const Transactions = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { data, error } = useSwr('/api/transactions', fetcher, { refreshInterval: 30000 })
  
    if (error) return <div>Failed to load transactions</div>
    if (!data) return <div>Loading...</div>
  
    return (
      <>
        <h5>Latest Transactions</h5>
        <table className="table table-striped">
          <tbody>
  
            {data?.transactions?.map((tx) => (
  
              <tr key={tx.Hash}>
                <td>TX</td>
                <td>
                  <Link href={`/transactions/${tx.Hash}`}><a>{tx.Hash.substring(0, 10)}...
                  </a>
                  </Link>
                </td>
                <td className={styles.address}>
                  From: <Link href={`/address/${tx.Sender}`}><a>{tx.Sender.substring(0, 10)} ...</a></Link>
                  <br />
                  To: <Link href={`/address/${tx.Recipient}`}><a>{tx.Recipient.substring(0, 10)}...</a></Link></td>
                <td>{tx.Amount}</td>
              </tr>
  
            ))}
  
          </tbody>
        </table>
      </>)
  }

  export default Transactions