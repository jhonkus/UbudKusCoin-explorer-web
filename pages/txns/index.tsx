import Link from 'next/link';
import TableTxns from '../../components/transactions/TableTxns'
import Layout from '../../components/Layout';

export default function Txns(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (
    <Layout pageTitle="Home page">
      <main id="main" className="main">

        <div className="pagetitle">
          <h4>Transactions</h4>
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
    </Layout>
  )
}

Txns.getInitialProps = async({ query: { page = 1 } }) => {
  return {
    page
  }
}