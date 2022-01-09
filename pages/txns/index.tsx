import Link from 'next/link';
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableTxns from '../../components/transactions/TableTxns'

export default function Txns(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (
    <>
      <Header />
      <main id="main" className="main">

        <div className="pagetitle">
          <h5>Transactions</h5>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/txns"><a>Transactions</a></Link>
              </li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <TableTxns page={pageNum} />

            </div></div>
        </section>
      </main>
      <Footer />
    </>
  )
}

Txns.getInitialProps = async ({ query: { page = 1 } }) => {
  return {
    page
  }
}