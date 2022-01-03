import Link from 'next/link'

const Footer = () => {
  return (
    <div className='container'>
      <footer className='py-3 my-4'>
        <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
          <li className='nav-item'>
            <Link href="/blocks">
              <a className='nav-link px-2 text-muted'>
                Blocks
              </a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href="/transactions">
              <a className='nav-link px-2 text-muted'>
                Transactions
              </a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href="/about">
              <a className='nav-link px-2 text-muted'>
                About
              </a>
            </Link>
          </li>
        </ul>
        <p className='text-center text-muted'>©2022 UbudKus Coin</p>
      </footer>
    </div>
  )
}

export default Footer
