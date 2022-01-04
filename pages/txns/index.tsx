import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import TableTxns from '../../components/transactions/TableTxns'

export default function Txns(props: any) {
  const pageNum = parseInt(props.page, 10);
  return (
    <div className="container">
      <Header />
      <TableTxns page={pageNum}/>
      <nav aria-label="block paging">
        <ul className="pagination">
          {/* <li className="page-item"><a className="page-link" href={`/blocks?page=1`}>First</a></li> */}
          <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum - 1}`}>Prev</a></li>
          <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum}`}>{pageNum}</a></li>
          <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 1}`}>{pageNum + 1}</a></li>
          <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 2}`}>{pageNum + 2}</a></li>
          <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 3}`}>{pageNum + 3}</a></li>
          <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 4}`}>{pageNum + 4}</a></li>
          <li className="page-item"><a className="page-link" href={`/txns?page=${pageNum + 5}`}>Next</a></li>
          {/* <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 1}`}>Last</a></li> */}
        </ul>
      </nav>
      <Footer />
    </div>
  )
}

Txns.getInitialProps = async({ query: { page = 1 } }) => {
  return {
    page
  }
}