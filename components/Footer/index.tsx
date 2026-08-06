import Link from 'next/link'

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        <strong>
          <span>
            <a href="https://ubudkuscoin.com" target="_blank" rel="noreferrer">UbudKusCoin</a>
          </span>
        </strong>
        <span> | </span>
        <Link href="/">Block Explorer</Link>
      </div>
      <div className="credits">
        Secure blockchain lookup for blocks, transactions, and accounts.
      </div>
    </footer>

  )
}

export default Footer
