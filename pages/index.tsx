import Link from 'next/link'
import Layout from '../components/Layout'
import TotalReward from '../components/dashboard/TotalReward'
import TotalTxns from '../components/dashboard/TotalTxns'
import TotalBlocks from '../components/dashboard/TotalBlocks'
import { useBcInfo, useChart, usePoolInfo } from '../grpc/useFetch'
import TotalTxnPool from '../components/dashboard/TotalTxnPool'
import TxnsChart from '../components/charts/TxnsAmountChart'
import TxnsAccount from '../components/charts/TxnsNumsChart'
import WidgetTxns from '../components/transactions/WidgetTxns'
import WidgetBlocks from '../components/blocks/WidgetBlock'
import { formatAmount, formatFee, formatNum, formatTotalTxns } from '../utils/util'
import styles from './Home.module.css'

export default function Home() {
  const { poolInfos, isPoolLoading } = usePoolInfo()
  const { bcInfos, isBCLoading } = useBcInfo()
  const { data, isLoading } = useChart()

  const totalFeesBaseUnits = (bcInfos?.txns || []).reduce((sum: number, tx: any) => sum + Number(tx.fee || tx.Fee || 0), 0);
  const totalFeesUKSC = totalFeesBaseUnits > 0 ? totalFeesBaseUnits / 100000000 : 0;

  const snapshotCards = [
    {
      label: 'Blocks',
      href: '/blocks',
      value: formatNum(bcInfos?.NumBloks ?? 0),
      suffix: 'Bk',
      hint: 'Validated blocks on chain',
    },
    {
      label: 'Transactions',
      href: '/txns',
      value: formatNum(bcInfos?.NumTxns ?? 0),
      suffix: 'Tx',
      hint: `Throughput ${formatTotalTxns(bcInfos?.Tps ?? 0)} TPS`,
    },
    {
      label: 'Tx Fees',
      href: '/txns',
      value: formatFee(totalFeesUKSC),
      suffix: 'UKSC',
      hint: 'Total transaction fees collected',
    },
    {
      label: 'Pool',
      href: '/txns/pending',
      value: formatNum(poolInfos?.NumPool ?? 0),
      suffix: 'Tx',
      hint: `${formatAmount((poolInfos?.AmountPool ?? 0) / 100000000)} UKSC queued`,
    },
  ]

  return (
    <Layout pageTitle="Dashboard">
      <main id="main" className="main">

        {/* Hero: Branding + Live Network Snapshot */}
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>UbudKusChain Explorer</span>
            <h1>Blockchain infrastructure for SME business networks.</h1>
            <p>
              Verifiable records, digital assets, loyalty programs, and enterprise integrations.
              Inspect blocks, transactions, and accounts on a transparent, auditable chain.
            </p>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelHeader}>
              <span>Network snapshot</span>
            </div>
            <div className={styles.snapshotGrid}>
              {snapshotCards.map((card) => (
                <Link href={card.href} key={card.label} className={styles.snapshotCard}>
                  <span className={styles.snapshotLabel}>{card.label} <i className="bi bi-arrow-right-short" /></span>
                  <strong>
                    {card.value} <span>{card.suffix}</span>
                  </strong>
                  <small>{card.hint}</small>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        {/* Charts */}
        <section className={styles.section}>
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <div className={styles.chartCard}>
                <div className={styles.sectionHeading}>
                  <div>
                    <span className={styles.sectionKicker}>Activity</span>
                    <h2>Transaction amount trend</h2>
                  </div>
                </div>
                <TxnsChart data={data} isLoading={isLoading} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.chartCard}>
                <div className={styles.sectionHeading}>
                  <div>
                    <span className={styles.sectionKicker}>Activity</span>
                    <h2>Transaction count trend</h2>
                  </div>
                </div>
                <TxnsAccount data={data} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </section>

        {/* Latest Blocks & Transactions */}
        <section className={styles.section}>
          <div className="row g-4 align-items-start">
            <div className="col-lg-5">
              <WidgetBlocks data={bcInfos} isLoading={isBCLoading} />
            </div>
            <div className="col-lg-7">
              <WidgetTxns data={bcInfos} isLoading={isBCLoading} />
            </div>
          </div>
        </section>

      </main>
    </Layout>
  )
}
