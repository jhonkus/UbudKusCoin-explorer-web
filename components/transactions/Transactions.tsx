import styles from './Transactions.module.css'
import Link from 'next/link'
import { useTransactions } from '../../services/useFetch';

/**
 * 
 * @returns Transactions component
 */
const Transactions = () => {

  const { transactions, isLoading, isError } = useTransactions();
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load transactions</div>

  return (
    <>
      <h5>Latest Transactions</h5>
      <table className="table table-striped">
        <tbody>

          {transactions?.map((tx) => (

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