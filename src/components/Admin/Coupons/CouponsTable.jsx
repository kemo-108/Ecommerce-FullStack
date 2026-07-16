import { FiGrid, FiList } from "react-icons/fi";
import CouponRow from "./CouponRow";

import "./CouponsTable.css";

const CouponsTable = ({
  coupons,
  setSelectedCoupon,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  return (
    <div className="coupons-table-container">
      {/* Table Header */}

      <div className="table-top">
        <div className="table-info">
          <h3>Coupons List</h3>

          <p>
            Showing <strong>{coupons.length}</strong> Coupons
          </p>
        </div>

        <div className="table-view">
          <span>View</span>

          <button className="active">
            <FiList />
          </button>

          <button>
            <FiGrid />
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="table-wrapper">
        <table className="coupons-table">
          <thead>
            <tr>
              <th>Coupon</th>
              <th>Discount</th>
              <th>Usage</th>
              <th>Validity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <CouponRow
                  key={coupon.id}
                  coupon={coupon}
                  setSelectedCoupon={setSelectedCoupon}
                  setOpenViewModal={setOpenViewModal}
                  setOpenEditModal={setOpenEditModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="empty-table">
                    <h3>No Coupons Found</h3>

                    <p>Try changing your search or filter options.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsTable;
