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
import SearchBox from '../components/search/SearchBox'
import { formatAmount, formatNum, formatTotalReward, formatTotalTxns } from '../utils/util'
import styles from './Home.module.css'

const quickLinks = [
  { href: '/blocks', label: 'Latest blocks', icon: 'bi-box-seam' },
  { href: '/txns', label: 'Transactions', icon: 'bi-arrow-left-right' },
  { href: '/accounts', label: 'Top accounts', icon: 'bi-people' },
  { href: '/txns/pending', label: 'Pending pool', icon: 'bi-clock-history' },
]

export default function Home() {
  const { poolInfos, isPoolLoading } = usePoolInfo()
  const { bcInfos, isBCLoading } = useBcInfo()
  const { data, isLoading } = useChart()

  const snapshotCards = [
    {
      label: 'Blocks',
      value: formatNum(bcInfos?.NumBloks ?? 0),
      suffix: 'Bk',
      hint: 'Validated blocks on chain',
    },
    {
      label: 'Transactions',
      value: formatNum(bcInfos?.NumTxns ?? 0),
      suffix: 'Tx',
      hint: `Throughput ${formatTotalTxns(bcInfos?.Tps ?? 0)} TPS`,
    },
    {
      label: 'Rewards',
      value: formatTotalReward(bcInfos?.AmountReward ?? 0),
      suffix: 'Uks',
      hint: 'Validator rewards collected',
    },
    {
      label: 'Pool',
      value: formatNum(poolInfos?.NumPool ?? 0),
      suffix: 'Tx',
      hint: `${formatAmount(poolInfos?.AmountPool ?? 0)} Uks queued`,
    },
  ]

  return (
    <Layout pageTitle="Dashboard">
      <main id="main" className="main">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>UbudKusCoin Explorer</span>
            <h1>Monitor the network with a cleaner, faster blockchain dashboard.</h1>
            <p>
              Search any address, block, or transaction hash and inspect live network activity with
              a layout designed for clarity.
            </p>
            <div className={styles.searchArea}>
              <SearchBox />
            </div>
            <div className={styles.quickLinks}>
              {quickLinks.map((item) => (
                <Link href={item.href} key={item.href} className={styles.quickLink}>
                  <i className={`bi ${item.icon}`} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelHeader}>
              <span>Network snapshot</span>
              <span className={styles.panelChip}>{isBCLoading || isPoolLoading ? 'Refreshing' : 'Live'}</span>
            </div>
            <div className={styles.snapshotGrid}>
              {snapshotCards.map((card) => (
                <div className={styles.snapshotCard} key={card.label}>
                  <span className={styles.snapshotLabel}>{card.label}</span>
                  <strong>
                    {card.value} <span>{card.suffix}</span>
                  </strong>
                  <small>{card.hint}</small>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionKicker}>Overview</span>
              <h2>Live metrics</h2>
            </div>
            <p>Numbers below refresh automatically from the network services.</p>
          </div>

          <div className="row g-4">
            <TotalBlocks data={bcInfos} isLoading={isBCLoading} />
            <TotalTxns data={bcInfos} isLoading={isBCLoading} />
            <TotalReward data={bcInfos} isLoading={isBCLoading} />
            <TotalTxnPool data={poolInfos} isLoading={isPoolLoading} />
          </div>
        </section>

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
