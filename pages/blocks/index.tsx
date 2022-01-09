import Link from 'next/link';
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableBlocks from '../../components/blocks/TableBlocks'

export default function Blocks(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (

    <>
      <Header />
      <main id="main" className="main">

        <div className="pagetitle">
          <h5>Blocks</h5>
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
      <Footer />
    </>
  )
}

Blocks.getInitialProps = async ({ query: { page = 1 } }) => {
  return {
    page
  }
}