import Link from 'next/link'
import Image from 'next/image'
import ukclogo from '../../public/logo-uksc-ubudkuscoin.png'
import SearchBox from '../search/SearchBox';
import { useState } from 'react';

const Header = () => {

  const [search, setSearch] = useState(false);

  const handleClick = () => {
    if (search) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  }

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">

      <div className="d-flex align-items-center justify-content-between">
        <Link href="/">
          <a className="logo d-flex align-items-center">
            <Image src={ukclogo} alt="Logo ubudkuscoin scan" />
          </a>
        </Link>
      </div>

      <div className={`${search === true ? 'search-bar-show' : "search-bar"}`}>
        <SearchBox />
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " onClick={handleClick} href="#">
              <i className="bi bi-search"></i>
            </a>
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
                <span>Main</span>
              </a>
            </Link>
          </li>

        </ul>
      </nav>
    </header>

  )
}
export default Header

