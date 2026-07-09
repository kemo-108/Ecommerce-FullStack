import "./ReturnsPagination.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ReturnsPagination = () => {
  return (
    <div className="returns-pagination">
      <button>
        <FiChevronLeft />
      </button>

      <button className="active">1</button>
      <button>2</button>
      <button>3</button>

      <button>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default ReturnsPagination;
