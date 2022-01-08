import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableTxns from '../../components/transactions/TableTxns'
import styles from './Txns.module.css'

export default function Txns(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (
    <>
      <Header />
      <div className={`container ${styles.bg}`}>
        <div>
          <TableTxns page={pageNum} />
        </div>
      </div>
      <Footer />
    </>
  )
}

Txns.getInitialProps = async ({ query: { page = 1 } }) => {
  return {
    page
  }
}