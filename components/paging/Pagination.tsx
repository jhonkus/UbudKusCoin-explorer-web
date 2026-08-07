import Link from 'next/link';

interface PaginationProps {
  pageNum?: number;
  isLast?: boolean;
  url?: string;
}

const Pagination = ({ pageNum = 1, isLast = false, url = '/' }: PaginationProps) => {
  const isFirst = pageNum <= 1;
  const prevPage = isFirst ? 1 : pageNum - 1;
  const nextPage = isLast ? pageNum : pageNum + 1;

  return (
    <nav aria-label="Pagination">
      <ul className="pagination mb-0">
        <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
          {isFirst ? (
            <span className="page-link text-muted" aria-disabled="true">
              <i className="bi bi-chevron-left"></i>
            </span>
          ) : (
            <Link href={`/${url}?page=${prevPage}`} className="page-link">
              <i className="bi bi-chevron-left"></i>
            </Link>
          )}
        </li>
        <li className="page-item active">
          <span className="page-link fw-bold">{pageNum}</span>
        </li>
        <li className={`page-item ${isLast ? 'disabled' : ''}`}>
          {isLast ? (
            <span className="page-link text-muted" aria-disabled="true">
              <i className="bi bi-chevron-right"></i>
            </span>
          ) : (
            <Link href={`/${url}?page=${nextPage}`} className="page-link">
              <i className="bi bi-chevron-right"></i>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
