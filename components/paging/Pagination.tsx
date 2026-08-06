import Link from 'next/link';

interface PaginationProps {
  pageNum?: number;
  isLast?: boolean;
  url?: string;
}

const Pagination = ({ pageNum = 1, isLast = false, url = "/" }: PaginationProps) => {
  const prevPage = pageNum <= 1 ? pageNum : pageNum - 1;
  const nextPage = isLast ? pageNum : pageNum + 1;

  return (
    <nav aria-label="block paging">
      <ul className="pagination">
        <li className="page-item">
          <Link href={`/${url}?page=${prevPage}`} className="page-link">
            <i className="bi bi-chevron-left"></i>
          </Link>
        </li>
        <li className="page-item">
          <Link href={`/${url}?page=${pageNum}`} className="page-link">
            {pageNum}
          </Link>
        </li>
        <li className="page-item">
          <Link href={`/${url}?page=${nextPage}`} className="page-link">
            <i className="bi bi-chevron-right"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
