import WidgetTxns from '../components/transactions/WidgetTxns'
import WidgetBlocks from '../components/blocks/WidgetBlock'
import Layout from '../components/Layout'
import TotalReward from '../components/dashboard/TotalReward'
import TotalTxns from '../components/dashboard/TotalTxns'
import TotalBlocks from '../components/dashboard/TotalBlocks'
import { getBcInfo, getPoolInfo } from '../grpc/useFetch'
import TotalTxnPool from '../components/dashboard/TotalTxnPool'
// import TxnsChart from '../components/charts/Txnschart'

export default function Home() {

  const { poolInfos, isPoolLoading } = getPoolInfo();
  const { bcInfos, isBCLoading } = getBcInfo();
  // if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  // if (isError) return <div><p>Error when loading</p></div>


  return (

    <Layout pageTitle="Home page">

      <main id="main" className="main ">


        <div className="pagetitle">
          <h5>&nbsp;</h5>
          <nav>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row d-flex justify-content-center">

            <div className="col-lg-11">
              <div className="row">
                <TotalBlocks data={bcInfos} isLoading={isBCLoading} />
                <TotalTxns data={bcInfos} isLoading={isBCLoading} />
                <TotalReward data={bcInfos} isLoading={isBCLoading} />
                <TotalTxnPool data={poolInfos} isLoading={isPoolLoading} />
              </div>
            </div>
          </div>


          {/* <div className="row d-flex justify-content-center">
            <div className="col-lg-6">

              <TxnsChart />


            </div>
            <div className="col-lg-6">
            </div>
          </div> */}


          <div className="row d-flex justify-content-center">
            <div className="col-lg-5">
              <WidgetBlocks />
              <br />
            </div>
            <div className="col-lg-6">
              <WidgetTxns />
              <br />
            </div>
          </div>
        </section>
      </main>
    </Layout >

  )
}


