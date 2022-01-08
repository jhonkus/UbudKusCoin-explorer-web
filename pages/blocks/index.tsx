import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableBlocks from '../../components/blocks/TableBlocks'
import styles from './Blocks.module.css'

export default function Blocks(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (
    <div className="container">
      <Header />
      <div className={styles.bg}>
        <TableBlocks page={pageNum} />
      </div>
      <Footer />
    </div>
  )
}

Blocks.getInitialProps = async ({ query: { page = 1 } }) => {
  return {
    page
  }
}