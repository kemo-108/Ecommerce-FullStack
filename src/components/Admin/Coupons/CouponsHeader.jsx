import { FiPlus } from "react-icons/fi";
import "./CouponsHeader.css";

const CouponsHeader = ({ setOpenAddModal }) => {
  return (
    <div className="coupons-header">
      <div className="header-content">
        <h1>Coupons</h1>
        <p>Manage all discount coupons and promotions</p>
      </div>

      <button className="add-coupon-btn" onClick={() => setOpenAddModal(true)}>
        <FiPlus />
        Create Coupon
      </button>
    </div>
  );
};

export default CouponsHeader;
