import { IconButton } from "@/components/ui/button/Button";
import { Icon } from "@iconify/react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  // TMDB supports a maximum of 500 pages
  const lastPage = Math.min(totalPages, 500);

  const getPages = () => {
    const pages = [];

    if (lastPage <= 5) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(lastPage - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < lastPage - 2) {
      pages.push("...");
    }

    pages.push(lastPage);

    return pages;
  };

  const pages = getPages();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > lastPage || newPage === page) return;

    onPageChange(newPage);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <IconButton
        variant="outline"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        aria-label="Previous page"
      >
        <Icon icon="fa:angle-left" />
      </IconButton>

      {/* Page Numbers */}
      {pages.map((item, index) =>
        item === "..." ? (
          <span key={`dots-${index}`} className="px-1 text-neutral-60">
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => handlePageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={page === item ? "page" : undefined}
            className={`size-10 rounded-lg text-sm font-semibold transition-colors ${
              page === item
                ? "bg-brand-50 text-white"
                : "bg-dark-12 text-neutral-70 hover:bg-dark-20"
            }`}
          >
            {item}
          </button>
        ),
      )}

      {/* Next Button */}
      <IconButton
        variant="outline"
        disabled={page === lastPage}
        onClick={() => handlePageChange(page + 1)}
        aria-label="Next page"
      >
        <Icon icon="fa:angle-right" />
      </IconButton>
    </div>
  );
};

export default Pagination;
