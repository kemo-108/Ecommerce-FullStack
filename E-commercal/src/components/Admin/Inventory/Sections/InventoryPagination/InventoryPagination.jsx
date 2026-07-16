import "./InventoryPagination.css";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import useInventory from "../../hooks/useInventory";
import { setPage } from "../../reducer/inventoryActions";

const InventoryPagination = () => {
  const { currentPage, totalPages, dispatch } = useInventory();

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    dispatch(setPage(page));
  };

  return (
    <div className="inventory-pagination">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => changePage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default InventoryPagination;
