import WidgetTxns from '../components/transactions/WidgetTxns'
import WidgetBlocks from '../components/blocks/WidgetBlock'
import Layout from '../components/Layout'
import TotalReward from '../components/dashboard/TotalReward'
import TotalTxns from '../components/dashboard/TotalTxns'
import TotalBlocks from '../components/dashboard/TotalBlocks'
import { getBcInfo, getPoolInfo } from '../grpc/useFetch'
import TotalTxnPool from '../components/dashboard/TotalTxnPool'

export default function Home() {

  const { poolInfos } = getPoolInfo();
  const { bcInfos } = getBcInfo();
  // if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  // if (isError) return <div><p>Error when loading</p></div>


  return (

    <Layout pageTitle="Home page">

      <main id="main" className="main">

        <section className="section dashboard">
          <div className="row">

            <div className="col-lg-12">
              <div className="row">
                <TotalBlocks data={bcInfos} />
                <TotalTxns data={bcInfos} />
                <TotalReward data={bcInfos} />
                <TotalTxnPool data={poolInfos} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
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


