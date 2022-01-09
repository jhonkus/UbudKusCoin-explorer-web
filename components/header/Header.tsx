import Link from 'next/link'
import Image from 'next/image'
import ukclogo from '../../public/logo-ubudkuscoin.png'

const Header = () => {
  return (
    <>
      {/* <head>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Ubudkuscoin.com</title>
        <meta content="Ubudkuscoin is blockcahin with low energy" name="description" />
        <meta content="blockchain, cryptocurrency, bali, putu kusuma" name="keywords" />

      </head> */}
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
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
          </form>
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
                <a className="nav-link"  target="_blank">
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
