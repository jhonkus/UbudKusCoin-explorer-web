import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ukclogo from '../../public/ukscscan-logo.png'
import SearchBox from '../search/SearchBox'

const Header = () => {
  const router = useRouter()

  const isActive = (path: string) => {
    const p = router.pathname
    return p === path || p.startsWith(path + '/') || (path === '/blocks' && p.startsWith('/blocks'))
  }

  return (
    <nav className="navbar header2 navbar-expand-lg navbar-light fixed-top py-2">
      <div className="container-fluid px-lg-4">
        <div className="d-flex align-items-center me-lg-4 me-3">
          <Link href="/" className="logo d-flex align-items-center me-4">
            <Image src={ukclogo} alt="Logo UbudKusCoin Scan" width="170" height="38" style={{ width: 'auto', height: 'auto' }} priority />
          </Link>
          <div className="network-badge d-none d-sm-inline-flex align-items-center ms-2">
            <span className="pulse-dot"></span>
            <span className="network-name">Mainnet</span>
          </div>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item dropdown ms-lg-2">
              <button className="nav-link dropdown-toggle btn btn-link p-0 border-0 d-flex align-items-center gap-1 nav-dropdown-btn" id="navbarDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span>Blockchain</span>
                <i className="bi bi-chevron-down nav-chevron"></i>
              </button>
              <ul className="dropdown-menu shadow-lg border-0 mt-2 dropdown-animated" aria-labelledby="navbarDropdown">
                <li>
                  <Link href="/blocks" className={`dropdown-item d-flex align-items-center gap-2 py-2 ${isActive('/blocks') ? 'active' : ''}`}>
                    <i className={`bi bi-box-seam ${isActive('/blocks') ? '' : 'text-primary'} fs-6`}></i>
                    <span>Blocks</span>
                    {isActive('/blocks') && <i className="bi bi-check2 ms-auto"></i>}
                  </Link>
                </li>
                <li>
                  <Link href="/txns" className={`dropdown-item d-flex align-items-center gap-2 py-2 ${isActive('/txns') ? 'active' : ''}`}>
                    <i className={`bi bi-arrow-left-right ${isActive('/txns') ? '' : 'text-success'} fs-6`}></i>
                    <span>Transactions</span>
                    {isActive('/txns') && <i className="bi bi-check2 ms-auto"></i>}
                  </Link>
                </li>
                <li>
                  <Link href="/txns/pending" className="dropdown-item d-flex align-items-center gap-2 py-2">
                    <i className="bi bi-clock-history text-warning fs-6"></i>
                    <span>Pending Transactions</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <Link href="/accounts" className="dropdown-item d-flex align-items-center gap-2 py-2">
                    <i className="bi bi-wallet2 text-info fs-6"></i>
                    <span>Top Accounts</span>
                  </Link>
                </li>
                <li>
                  <Link href="/validators" className="dropdown-item d-flex align-items-center gap-2 py-2">
                    <i className="bi bi-shield-check text-secondary fs-6"></i>
                    <span>Validators</span>
                  </Link>
                </li>
                <li>
                  <Link href="/charts" className="dropdown-item d-flex align-items-center gap-2 py-2">
                    <i className="bi bi-graph-up text-danger fs-6"></i>
                    <span>Analytics &amp; Charts</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="ms-lg-auto my-2 my-lg-0 header-search-container">
            <SearchBox />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header

