import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableBlocks from '../../components/blocks/TableBlocks'

export default function Blocks(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (
    <div className="container-fluid">
      <Header />
      <TableBlocks page={pageNum} />
      <Footer />
    </div>
  )
}

Blocks.getInitialProps = async({ query: { page = 1 } }) => {
  return {
    page
  }
}