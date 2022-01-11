import Link from 'next/link'

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        @2022 <strong><span>
          <Link href="https://ubudkuscoin.com"><a  target="_blank">Ubudkuscoin.com</a></Link> | <Link href="/"><a>Block Explorer</a></Link>
        </span></strong>
      </div>
      <div className="credits">
        &nbsp;
      </div>
    </footer>

  )
}

export default Footer
