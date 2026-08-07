import Link from 'next/link'
import Image from 'next/image'
import ukclogo from '../../public/ukscscan-logo.png'

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <Link href="/" className="logo d-inline-flex">
                <Image src={ukclogo} alt="UbudKusCoin Scan" width="170" height="38" style={{ width: 'auto', height: 'auto' }} />
              </Link>
              <p>
                The official blockchain explorer for the UbudKusCoin network. Search and inspect
                blocks, transactions, and accounts in real time.
              </p>
            </div>
          </div>

          {/* Explorer */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Explorer</h6>
            <ul className="footer-links">
              <li>
                <Link href="/blocks"><i className="bi bi-box-seam"></i> Blocks</Link>
              </li>
              <li>
                <Link href="/txns"><i className="bi bi-arrow-left-right"></i> Transactions</Link>
              </li>
              <li>
                <Link href="/txns/pending"><i className="bi bi-clock-history"></i> Pending Txns</Link>
              </li>
              <li>
                <Link href="/accounts"><i className="bi bi-wallet2"></i> Top Accounts</Link>
              </li>
            </ul>
          </div>

          {/* Network */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Network</h6>
            <ul className="footer-links">
              <li>
                <Link href="/validators"><i className="bi bi-shield-check"></i> Validators</Link>
              </li>
              <li>
                <Link href="/charts"><i className="bi bi-graph-up"></i> Analytics</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Resources</h6>
            <ul className="footer-links">
              <li>
                <Link href="/about"><i className="bi bi-info-circle"></i> About</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} <strong>UbudKusCoin</strong> · All rights reserved.
          </div>
          <div className="credits">
            Secure blockchain lookup for blocks, transactions, and accounts.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
