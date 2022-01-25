import Link from 'next/link';
import Layout from "../../components/Layout";
import TableAccounts from '../../components/accounts/TableAccounts';

export default function AccountList(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (

    <Layout pageTitle="Blocks">
      <main id="main" className="main">

        <div className="pagetitle">
          <h4>Top Accounts by Balance</h4>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/accounts"><a>Accounts</a></Link>
              </li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <TableAccounts page={pageNum} />

            </div></div>
        </section>
      </main>
    </Layout>
  )
}

AccountList.getInitialProps = async({ query: { page = 1 } }) => {
  return {
    page
  }
}