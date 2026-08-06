import TablePendingTxns from '../../../components/transactions/TablePendingTxns'
import Layout from '../../../components/Layout';
import Breadcrumb from '../../../components/Breadcrumb';

export default function TablePending() {
  return (
    <Layout pageTitle="Pending Transactions">
      <main id="main" className="main">

        <div className="pagetitle">
          <h4>Pending Transactions</h4>
          <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/txns/pending', label: 'Pending Transactions' }]} />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <TablePendingTxns />

            </div></div>
        </section>
      </main>
    </Layout>
  )
}
