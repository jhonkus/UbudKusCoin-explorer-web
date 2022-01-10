import Link from 'next/link'
import Image from 'next/image'
import ukclogo from '../../public/logo-ubudkuscoin.png'
import SearchBox from '../search/SearchBox';
const Header = () => {
  return (
    <>

      <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
          <Link href="/">
            <a className="logo d-flex align-items-center">
              <Image src={ukclogo} alt="Logo ubudkuscoin" />&nbsp;
              <span className="d-none d-lg-block">Ubudkuscoin</span>
            </a>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>{/* <!-- End Logo --> */}

        <div className="search-bar">
          <SearchBox />
        </div>{/* <!-- End Search Bar --> */}

        <nav className="header-nav">
          <ul className="d-flex justify-content-center">

            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">
                  <span>Home</span>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/blocks">
                <a className="nav-link">
                  <span>Blocks</span>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/txns">
                <a className="nav-link">
                  <span>Trancactions</span>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="https://ubudkuscoin.com">
                <a className="nav-link" target="_blank">
                  <span>Main web</span>
                </a>
              </Link>
            </li>

          </ul>
        </nav>

      </header>
    </>
  )
}
export default Header
