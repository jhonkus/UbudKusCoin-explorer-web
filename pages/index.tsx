import WidgetTxns from '../components/transactions/WidgetTxns'
import WidgetBlocks from '../components/blocks/WidgetBlock'
import Layout from '../components/Layout'
import TotalReward from '../components/dashboard/TotalReward'
import TotalTxns from '../components/dashboard/TotalTxns'
import TotalBlocks from '../components/dashboard/TotalBlocks'
import { getBcInfo, getChart, getPoolInfo } from '../grpc/useFetch'
import TotalTxnPool from '../components/dashboard/TotalTxnPool'
import React from 'react'
import TxnsChart from '../components/charts/Txnschart'
import TxnsAccount from '../components/charts/TxnsAccount'

export default function Home() {

  const { poolInfos, isPoolLoading } = getPoolInfo();
  const { bcInfos, isBCLoading } = getBcInfo();
  const { data, isLoading } = getChart();

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


          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <TxnsChart data={data} isLoading={isLoading}/>
            </div>
            <div className="col-lg-5">
              <TxnsAccount data={data} isLoading={isLoading}/>
            </div>
          </div>
          <br />


          <div className="row d-flex justify-content-center">
            <div className="col-lg-5">
              <WidgetBlocks data={bcInfos} isLoading={isBCLoading} />
              <br />
            </div>
            <div className="col-lg-6">
              <WidgetTxns data={bcInfos} isLoading={isBCLoading} />
              <br />
            </div>
          </div>
        </section>
      </main>
    </Layout >

  )
}


