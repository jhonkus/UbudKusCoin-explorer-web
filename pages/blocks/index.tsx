import Link from 'next/link';
import Layout from "../../components/Layout";
import TableBlocks from '../../components/blocks/TableBlocks'

export default function Blocks(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (

    <Layout pageTitle="Blocks">
      <main id="main" className="main">

        <div className="pagetitle">
          <h4>Blocks</h4>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/blocks"><a>Blocks</a></Link>
              </li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">

              <TableBlocks page={pageNum} />

            </div></div>
        </section>
      </main>
    </Layout>
  )
}

Blocks.getInitialProps = async({ query: { page = 1 } }) => {
  return {
    page
  }
}