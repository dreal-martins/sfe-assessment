import { FC } from "react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 20, 50, 100],
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-2 space-y-2 md:space-y-0">
      <div className="flex items-center w-full md:w-auto space-x-2">
        <span className="text-sm dark:text-[#667185] text-white ">
          {t("rowsPerPage")}:
        </span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center w-full md:w-auto justify-center space-x-1">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 text-sm dark:text-[#667185] text-white "
        >
          {"|<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 text-sm dark:text-[#667185] text-white "
        >
          {"<"}
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page =
            i + Math.max(1, Math.min(currentPage - 2, totalPages - 4));
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage
                  ? "bg-[#ffb616] dark:text-[#667185] text-white"
                  : ""
              } text-sm dark:text-[#667185] text-white `}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 text-sm dark:text-[#667185] text-white "
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 text-sm dark:text-[#667185] text-white "
        >
          {">|"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
