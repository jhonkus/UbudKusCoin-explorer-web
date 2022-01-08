import Head from 'next/head'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import WidgetTxns from '../components/transactions/WidgetTxns'
import WidgetBlocks from '../components/blocks/WidgetBlock'

export default function Home() {
  return (
    <div className="container">
      <Header />
      <main className="d-flex flex-column min-vh-100">
        <Head>
          <title>The UbudkusCoin Explorer</title>
          <meta name='description' content='web app for ubudkuscoin blockchain explorer' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <div className='px-4 py-5 my-5 text-center flex-grow-1'>
          <h5 className='display-6 fw-bold'>The UKC Blockchain Explorer</h5>
          <p className="lead">Block created every 30 Seconds</p>
        </div>
        {/* <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Transactions</h5>
                <p className="card-text">1,000,000 Txns</p>
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Blocks</h5>
                <p className="card-text">1000 blocks so far.</p>
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">History</h5>
                <p className="card-text">Chart transaction history comming soon.</p>
              </div>
            </div>
          </div>
        </div>

        <br /><br /> */}

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
            <WidgetBlocks />
            <br />
          </div>
          <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6'>
            <WidgetTxns />
            <br />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


