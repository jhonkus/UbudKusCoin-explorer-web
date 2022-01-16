import Link from 'next/link';
import TablePendingTxns from '../../../components/transactions/TablePendingTxns'
import Layout from '../../../components/Layout';

export default function TablePending(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (
    <Layout pageTitle="Home page">
      <main id="main" className="main">

        <div className="pagetitle">
          <h4>Pending Transactions</h4>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/txns/pending"><a>Pending Transactions</a></Link>
              </li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <TablePendingTxns page={pageNum} />

            </div></div>
        </section>
      </main>
    </Layout>
  )
}
TablePendingTxns
TablePending.getInitialProps = async({ query: { page = 1 } }) => {
  return {
    page
  }
}