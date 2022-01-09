import Link from 'next/link'

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        @2022 <strong><span>
          <Link href="/"><a>Ubudkuscoin.com</a></Link>
        </span></strong>
      </div>
      <div className="credits">
        &nbsp;
      </div>
    </footer>

  )
}

export default Footer
