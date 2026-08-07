import Link from 'next/link';
import styles from './Accounts.module.css';
import { timeAgo, formatAmount, formatNum, truncateText } from '../../utils/util';
import { useAccounts } from '../../grpc/useFetch';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../paging/Pagination';

interface TableAccountsProps {
  page?: number;
}

const TableAccounts = ({ page = 1 }: TableAccountsProps) => {
  const pageSize = 25;
  const { accounts, isLoading, isError } = useAccounts(page, pageSize);

  const startItem = accounts && accounts.length > 0 ? (page - 1) * pageSize + 1 : 0;
  const endItem = (page - 1) * pageSize + (accounts ? accounts.length : 0);
  const isLast = !accounts || accounts.length < pageSize;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        {(!accounts && !isLoading && !isError) && (
          <div className="text-center py-4"><p className="text-muted mb-0">No accounts found.</p></div>
        )}
        {(isLoading || isError) && <Skeleton count={10} />}
        {accounts && (
          <>
            <div className="row align-items-center mb-3">
              <div className="col d-flex justify-content-start">
                <p className="text-secondary mb-0 fw-semibold">
                  Showing {startItem} to {endItem} Accounts
                </p>
              </div>
              <div className="col d-flex justify-content-end">
                <Pagination isLast={isLast} pageNum={page} url="accounts" />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table datatable align-middle">
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Address</th>
                    <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Balance</th>
                    <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Txn Count</th>
                    <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((acc) => (
                    <tr key={acc.address || acc.Id}>
                      <td>
                        <Link href={`/address/${acc.address}`} className={`${styles.heightBlock} font-monospace fw-bold text-primary`}>
                          {truncateText(acc.address, 18)}
                        </Link>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className={styles.amountInTable}>
                          <b>{formatAmount(acc.balance)}</b> UKSC
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className={styles.amountInTable}>
                          <b>{formatNum(acc.txn_count)}</b>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={styles.dateInTable}>{timeAgo(acc.last_update)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row align-items-center mt-3">
              <div className="col d-flex justify-content-end">
                <Pagination isLast={isLast} pageNum={page} url="accounts" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TableAccounts;
