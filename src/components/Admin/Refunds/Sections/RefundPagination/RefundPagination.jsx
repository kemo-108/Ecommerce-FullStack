import "./RefundPagination.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const RefundPagination = () => {
  return (
    <div className="refund-pagination">
      <button className="page-btn">
        <FiChevronLeft />
      </button>

      <button className="page-number active">1</button>

      <button className="page-number">2</button>

      <button className="page-number">3</button>

      <button className="page-number">4</button>

      <button className="page-btn">
        <FiChevronRight />
      </button>
    </div>
  );
};

export default RefundPagination;
