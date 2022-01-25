
const Pagination = ({ pageNum = 1, isLast = false, url="/" }) => {
    return (
      <nav aria-label="block paging">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href={`/${url}?page=${pageNum <= 1 ? pageNum : pageNum - 1}`}>Prev</a></li>
          <li className="page-item"><a className="page-link" href={`/${url}?page=${pageNum}`}>{pageNum}</a></li>
          <li className="page-item"><a className="page-link" href={`/${url}?page=${isLast ? pageNum : pageNum + 1}`}>Next</a></li>
        </ul>
      </nav>
    )
}

export default Pagination;
