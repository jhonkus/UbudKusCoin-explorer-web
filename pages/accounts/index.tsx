import Layout from "../../components/Layout";
import Breadcrumb from '../../components/Breadcrumb';
import TableAccounts from '../../components/accounts/TableAccounts';

interface AccountsProps {
  page: number;
}

export default function AccountList({ page }: AccountsProps) {
  return (
    <Layout pageTitle="Accounts">
      <main id="main" className="main">

        <div className="pagetitle">
          <h4>Top Accounts by Balance</h4>
          <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/accounts', label: 'Accounts' }]} />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <TableAccounts page={page} />

            </div></div>
        </section>
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const raw = parseInt(query.page, 10);
  return {
    props: {
      page: Number.isFinite(raw) && raw > 0 ? raw : 1,
    },
  };
}
