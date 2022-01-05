import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableTxns from '../../components/transactions/TableTxns'

export default function Txns(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (
    <div className="container">
      <Header />
      <TableTxns page={pageNum}/>
      <Footer />
    </div>
  )
}

Txns.getInitialProps = async({ query: { page = 1 } }) => {
  return {
    page
  }
}