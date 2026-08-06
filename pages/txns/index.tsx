import TableTxns from '../../components/transactions/TableTxns'
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';

interface TxnsProps {
  page: number;
}

export default function Txns({ page }: TxnsProps) {
  return (
    <Layout pageTitle="Transactions">
      <main id="main" className="main">

        <div className="pagetitle">
          <h4>Transactions</h4>
          <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/txns', label: 'Transactions' }]} />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <TableTxns page={page} />

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
