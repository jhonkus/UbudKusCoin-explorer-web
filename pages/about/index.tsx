import Layout from '../../components/Layout'
import Breadcrumb from '../../components/Breadcrumb'
import Image from 'next/image'
import Link from 'next/link'
import ukclogo from '../../public/ukscscan-logo.png'

const features = [
  {
    icon: 'bi-box-seam',
    title: 'Block Explorer',
    text: 'Browse every block on the chain with height, timestamp, validator, and reward details.',
  },
  {
    icon: 'bi-arrow-left-right',
    title: 'Transaction Tracking',
    text: 'Follow transactions from sender to recipient with amounts, fees, and confirmation status.',
  },
  {
    icon: 'bi-wallet2',
    title: 'Account Insights',
    text: 'Inspect account balances, validation history, and transaction activity in one place.',
  },
  {
    icon: 'bi-graph-up',
    title: 'Network Analytics',
    text: 'Visualize transaction growth and consensus metrics with live, up-to-date charts.',
  },
]

export default function About() {
  return (
    <Layout pageTitle="About">
      <main id="main" className="main">
        <div className="pagetitle">
          <h4>About</h4>
          <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/about', label: 'About' }]} />
        </div>

        {/* Intro */}
        <section className="section">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 mb-3">
                UbudKusCoin Explorer
              </span>
              <h1 className="h2 fw-bold mb-3" style={{ letterSpacing: '-0.03em' }}>
                Transparency for the UbudKusCoin network
              </h1>
              <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                UbudKusCoin Explorer is the official block explorer for the UbudKusCoin blockchain.
                We provide a clean, fast, and reliable interface for viewing blocks, transactions,
                addresses, validators, and live network activity — making the chain transparent and
                accessible to everyone.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a className="btn btn-primary px-4" href="https://ubudkuscoin.com" target="_blank" rel="noreferrer">
                  <i className="bi bi-globe me-2"></i>Visit UbudKusCoin
                </a>
<Link className="btn btn-outline-primary px-4" href="/blocks">
                  Start Exploring
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <Image src={ukclogo} alt="UbudKusCoin Scan Logo" width={240} height={54} style={{ width: 'auto', height: 'auto' }} />
                  <p className="text-muted small mt-3 mb-0">
                    Designed for clarity · Built for the community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section">
          <div className="row g-4">
            {features.map((f) => (
              <div className="col-md-6 col-lg-3" key={f.title}>
                <div className="card h-100 card-hover border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(15,98,254,0.1)', color: 'var(--primary)' }}>
                      <i className={`bi ${f.icon} fs-5`}></i>
                    </div>
                    <h5 className="h6 fw-bold mb-2">{f.title}</h5>
                    <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="section">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <h2 className="h4 fw-bold mb-3">Our mission</h2>
              <p className="text-muted mb-0" style={{ lineHeight: 1.8 }}>
                We believe blockchain data should be open and easy to understand. Our goal is to
                give builders, validators, and the broader UbudKusCoin community the tools they
                need to verify activity, audit the chain, and make informed decisions. Whether
                you&apos;re a developer, a validator, or simply curious, the explorer is here to
                help you navigate the network with confidence.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
