import Link from 'next/link'
import Image from 'next/image'
import ukclogo from '../../public/logo-uksc-ubudkuscoin.png'
import SearchBox from '../search/SearchBox';

const Header = () => {

  // const [search, setSearch] = useState(false);

  // const handleClick = () => {
  //   if (search) {
  //     setSearch(false);
  //   } else {
  //     setSearch(true);
  //   }
  // }

  return (

    <nav className="navbar header2 navbar-expand-lg navbar-light bg-white fixed-top">
      <div className="container-fluid">
        <Link href="/">
          <a className="logo d-flex align-items-center">
            <Image src={ukclogo} alt="Logo ubudkuscoin scan" width="219" height="45"/>
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Blockchain
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li className="nav-item">
                  <Link href="/blocks">
                    <a className="dropdown-item">
                      <span>Blocks</span>
                    </a>
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li className="nav-item">
                  <Link href="/txns">
                    <a className="dropdown-item">
                      <span>Trancactions</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="https://ubudkuscoin.com">
                <a className="nav-link" target="_blank">
                  <span>Main</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">&nbsp;&nbsp;</a>
            </li>
          </ul>
          <SearchBox />
        </div>
      </div>
    </nav>

  )
}
export default Header
