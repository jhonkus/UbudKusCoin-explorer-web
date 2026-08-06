import Layout from "../../components/Layout";
import Breadcrumb from '../../components/Breadcrumb';
import TableBlocks from '../../components/blocks/TableBlocks'

interface BlocksProps {
  page: number;
}

export default function Blocks({ page }: BlocksProps) {
  return (
    <Layout pageTitle="Blocks">
      <main id="main" className="main">

        <div className="pagetitle">
          <h4>Blocks</h4>
          <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/blocks', label: 'Blocks' }]} />
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <TableBlocks page={page} />

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
