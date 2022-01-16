import WidgetTxns from '../components/transactions/WidgetTxns'
import WidgetBlocks from '../components/blocks/WidgetBlock'
import Layout from '../components/Layout'

export default function Home() {
  return (

    <Layout pageTitle="Home page">

      <main id="main" className="main">

        <div className='px-4 py-5 my-5 text-center flex-grow-1'>
          <h1 className='display-6 fw-bold'>Ubudkuscoin Explorer</h1>
          <p className="lead">Block created every 30 seconds</p>
          <div className="alert alert-warning" role="alert">
            This website in live TESTING mode. <br />
            version: Alpha
          </div>
        </div>

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
    </Layout>

  )
}


