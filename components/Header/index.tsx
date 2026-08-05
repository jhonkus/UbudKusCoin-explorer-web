import Link from 'next/link'
import Image from 'next/image'
import ukclogo from '../../public/ukscscan-logo.png'
import SearchBox from '../search/SearchBox';

const Header = () => {
  return (
    <nav className="navbar header2 navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <Link href="/">
          <a className="logo d-flex align-items-center">
            <Image src={ukclogo} alt="Logo ubudkuscoin scan" width="188" height="42" />
          </a>
        </Link>
        <span className="header-tagline ms-3 d-none d-lg-inline-flex">Live network explorer</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active" aria-current="page">Home</a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn btn-link p-0 border-0" id="navbarDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Blockchain
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link href="/blocks">
                    <a className="dropdown-item">
                      Blocks
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/txns">
                    <a className="dropdown-item">
                      Transactions
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/txns/pending">
                    <a className="dropdown-item">
                      Pending Transactions
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/accounts">
                    <a className="dropdown-item">
                      Top Accounts
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/nodes">
                    <a className="dropdown-item">
                      Nodes
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://ubudkuscoin.com" target="_blank" rel="noreferrer">
                Main site
              </a>
            </li>
          </ul>
          <div className="ms-lg-auto">
            <SearchBox />
          </div>
        </div>
      </div>
    </nav>

  )
}
export default Header
