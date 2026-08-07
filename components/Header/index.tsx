import Link from 'next/link'
import Image from 'next/image'
import ukclogo from '../../public/ukscscan-logo.png'
import SearchBox from '../search/SearchBox';

const Header = () => {
  return (
    <nav className="navbar header2 navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <Link href="/" className="logo d-flex align-items-center">
          <Image src={ukclogo} alt="Logo ubudkuscoin scan" width="188" height="42" style={{ width: 'auto', height: 'auto' }} />
        </Link>
        <span className="header-tagline ms-3 d-none d-lg-inline-flex">Live network explorer</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link href="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn btn-link p-0 border-0" id="navbarDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Blockchain
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link href="/blocks" className="dropdown-item">
                    Blocks
                  </Link>
                </li>
                <li>
                  <Link href="/txns" className="dropdown-item">
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link href="/txns/pending" className="dropdown-item">
                    Pending Transactions
                  </Link>
                </li>
                <li>
                  <Link href="/accounts" className="dropdown-item">
                    Top Accounts
                  </Link>
                </li>
                <li>
                  <Link href="/validators" className="dropdown-item">
                    Validators
                  </Link>
                </li>
                <li>
                  <Link href="/charts" className="dropdown-item">
                    Analytics &amp; Charts
                  </Link>
                </li>

              </ul>
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