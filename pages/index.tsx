import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import styles from './Home.module.css'
import { useEffect, useState } from 'react'
import { getBloks, GetTransactions } from '../grpc/lib/useFetch';


export default function Home() {


  const [blockPage, setBlockPage] = useState(1);
  const [txPage, setTxPage] = useState(1);

  const { blocksList } = getBloks(blockPage);
  const { transactionsList } = GetTransactions(txPage);
  console.log(transactionsList);
  // console.log(blocksList);

  useEffect(() => {

  }, [])


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
            <h5>Latest Blocks</h5>
            <table className={'table-table-striped'}>

              <tbody>

                {blocksList?.map((block) => (

                  <tr key={block.height}>
                    <td>BK</td>
                    <td className={styles.colWide}>
                      {block.height} <br/>
                      {block.timestamp}
                    </td>
                    <td className={styles.address}>
                      Validate by: {block.validator?.substring(0, 10)}
                      <br/>
                      {block.numoftx} txns 
                    </td>
                    <td className={styles.colWide}>{block.totalamount} UKC</td>
                  </tr>

                ))}

              </tbody>
            </table>
          </div>
          <div className='col-md-6'>
            <h5>Latest Transactions</h5>
            <table className="table table-striped">
              <tbody>

                {transactionsList?.map((tx) => (

                  <tr key={tx.hash}>
                    <td>TX</td>
                    <td>{tx.hash.substring(0, 10)}...</td>
                    <td className={styles.address}>
                      From: {tx.sender.substring(0, 10)} ...
                      <br />
                      To: {tx.recipient.substring(0, 10)}...</td>
                    <td>{tx.amount}</td>
                  </tr>

                ))}

              </tbody>
            </table>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}


