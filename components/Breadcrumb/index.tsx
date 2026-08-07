import Link from 'next/link';

interface Crumb {
  href?: string;
  label: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

/**
 * Renders a Bootstrap breadcrumb trail. The last item is the current page
 * (not a link).
 */
const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav>
      <ol className="breadcrumb">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li className={`breadcrumb-item ${isLast ? 'active' : ''}`} key={item.href || item.label}>
              {isLast || !item.href ? (
                item.label
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
