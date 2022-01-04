import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Blocks from '../components/blocks/Blocks'
import Transactions from '../components/transactions/Transactions'

export default function Home() {

  return (
    <div className={'container'}>
      <Header />
      <main className={'d-flex flex-column min-vh-100'}>
        <Head>
          <title>The UbudkusCoin Explorer</title>
          <meta name='description' content='web app for ubudkuscoin blockchain explorer' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='px-4 py-5 my-5 text-center flex-grow-1'>
          <h5 className='display-5 fw-bold'>The UKC Blockchain Explorer</h5>
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


