import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import WidgetTxns from '../components/transactions/WidgetTxns'
import WidgetBlocks from '../components/blocks/WidgetBlock'

export default function Home() {
  return (
    <>
      <Header />

      <main id="main" className="main">

        <div className='px-4 py-5 my-5 text-center flex-grow-1'>
          <h1 className='display-6 fw-bold'>The UKC Blockchain Explorer</h1>
          <p className="lead">Block created every 30 seconds</p>
          <div className="alert alert-warning" role="alert">
          WARNING!!<br/>
          This website currently not doing any real business,  
          this website for educational purposes only!. <br/> This website is live testing. 
          version: alpha
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
      <Footer />
    </>
  )
}


