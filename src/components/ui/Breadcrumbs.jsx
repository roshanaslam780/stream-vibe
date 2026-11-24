import { Icon } from "@iconify/react";
import { Link } from "react-router";

const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;

        return (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && (
              <Icon
                aria-hidden="true"
                icon="lucide:chevron-right"
                className="size-4 text-neutral-60"
              />
            )}
            {item.to && !isCurrent ? (
              <Link
                to={item.to}
                className="text-neutral-60 transition-colors hover:text-white hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isCurrent ? "page" : undefined}
                className={isCurrent ? "font-semibold text-white" : "text-neutral-60"}
              >
                {item.label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
