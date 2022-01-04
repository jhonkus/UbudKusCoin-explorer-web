import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableTxns from '../../components/transactions/TableTxns'

export default function Transactions() {
  return (
    <div className={'container'}>
      <Header />
      <TableTxns />
      <Footer />
    </div>
  )
}
