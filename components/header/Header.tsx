import Link from 'next/link'
import Image from 'next/image'
import logoUkc from '../../public/logoUkc.png'

const Header = () => {
  return (
    // <!-- Responsive navbar-->
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link href="/"><a className="navbar-brand">
          <Image src={logoUkc} alt="Logo Ukc" width="30" height="24" className="d-inline-block align-text-top" />
          &nbsp;&nbsp;UKCScan
        </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/"><a className="nav-link active" aria-current="page">Home</a></Link>
            </li>
            <li className="nav-item">
              <Link href="https://ubudkuscoin.com"><a  target="_blank" className="nav-link active" aria-current="page">Main site</a></Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Blockchain
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link href="/blocks"><a className="dropdown-item">View blocks</a></Link></li>
                <li><Link href="/txns"><a className="dropdown-item">View txns</a></Link></li>
              </ul>
            </li>
            <li>&nbsp;&nbsp;&nbsp;</li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}
export default Header
