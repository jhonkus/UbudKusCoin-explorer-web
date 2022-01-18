import WidgetTxns from '../components/transactions/WidgetTxns'
import WidgetBlocks from '../components/blocks/WidgetBlock'
import Layout from '../components/Layout'
import TotalReward from '../components/dashboard/TotalReward'
import TotalTxns from '../components/dashboard/TotalTxns'
import TotalBlocks from '../components/dashboard/TotalBlocks'
import TotalTxnPool from '../components/dashboard/TotalTxnPool'
import { getBcInfo } from '../grpc/useFetch'

export default function Home() {

  const { infos } = getBcInfo();
  // if (isLoading) return <div><Image src={loading} width="20" height="20" alt="Please wait loading ..." /></div>
  // if (isError) return <div><p>Error when loading</p></div>


  return (

    <Layout pageTitle="Home page">

      <main id="main" className="main">

        <section className="section dashboard">
          <div className="row">

            <div className="col-lg-12">
              <div className="row">
                <TotalBlocks data={infos} />
                <TotalTxns data={infos} />
                <TotalTxnPool data={infos} />
                <TotalReward data={infos} />
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


