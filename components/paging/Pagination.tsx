
const Pagination = ({ pageNum = 1, isLast = false }) => {
    return (
      <nav aria-label="block paging">
        <ul className="pagination">
          {/* <li className="page-item"><a className="page-link" href={`/blocks?page=1`}>First</a></li> */}
          <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum <= 1 ? pageNum : pageNum - 1}`}>Prev</a></li>
          <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum}`}>{pageNum}</a></li>
          <li className="page-item"><a className="page-link" href={`/blocks?page=${isLast ? pageNum : pageNum + 1}`}>Next</a></li>
          {/* <li className="page-item"><a className="page-link" href={`/blocks?page=${pageNum + 1}`}>Last</a></li> */}
        </ul>
      </nav>
    )
}

export default Pagination;
