import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import styles from './Home.module.css'
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

/**
 * Block component
 * @returns 
 */
const Blocks = () => {
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
                {block.Height} <br />
                {block.TimeStamp}
              </td>
              <td className={styles.address}>
                Validate by: {block.Validator?.substring(0, 10)}
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
/**
 * 
 * @returns Transactions component
 */
const Transactions = () => {
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
              <td>{tx.Hash.substring(0, 10)}...</td>
              <td className={styles.address}>
                From: {tx.Sender.substring(0, 10)} ...
                <br />
                To: {tx.Recipient.substring(0, 10)}...</td>
              <td>{tx.Amount}</td>
            </tr>

          ))}

        </tbody>
      </table>
    </>)
}

export default function Home() {

  return (
    <div className={'container'}>
      <Header />
      <main className={'d-flex flex-column min-vh-100'}>
        <Head>
          <title>Ubudkus Coin Explorer</title>
          <meta name='description' content='web app for ubudkuscoin blockchain explorer' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='px-4 py-5 my-5 text-center flex-grow-1'>
          <h1 className='display-5 fw-bold'>UKC Blockchain Explorer</h1>
        </div>

        <div className={'row'}>
          <div className={'col-md-6'}>
            <Blocks />
          </div>
          <div className='col-md-6'>
            <Transactions />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}


