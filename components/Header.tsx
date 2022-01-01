import Link from "next/link";

const Header = () => {
  return (
    <header className='p-3 bg-dark text-white'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <Link href="/">
            <a className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'>
              UKC Scan
            </a>
          </Link>


          <ul className='nav col-8 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <li>
              <Link href="/blocks">
                <a className='nav-link px-2 text-white'>
                  Blocks
                </a>
              </Link>
            </li>
            <li>
              <Link href="/transactions">
                <a className='nav-link px-2 text-white'>
                  Trasactions
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className='nav-link px-2 text-white'>
                  About
                </a>
              </Link>
            </li>
          </ul>

          <form className='col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3'>
            <input
              type='search'
              className='form-control form-control-dark'
              placeholder='Search...'
              aria-label='Search'
            />
          </form>

          <div className='text-end'>
            <button type='button' className='btn btn-outline-light me-2'>
              <Link href="/login">Login</Link>
            </button>
            <button type='button' className='btn btn-warning'>
            <Link href="/signup">Sign-up</Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;