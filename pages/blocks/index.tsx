import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableBlocks from '../../components/blocks/TableBlocks'

export default function Block() {
  return (
    <div className={'container'} >
      <Header />
      <TableBlocks/>
      <Footer />
    </div>
  )
}
