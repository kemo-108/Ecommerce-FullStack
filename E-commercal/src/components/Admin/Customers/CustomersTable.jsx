import CustomerRow from "./CustomerRow";
import "./CustomersTable.css";

const CustomersTable = ({
  customers,
  currentPage,
  customersPerPage,
  setSelectedCustomer,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;

  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);

  return (
    <div className="customers-table">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <CustomerRow
                key={customer.customerId}
                customer={customer}
                setSelectedCustomer={setSelectedCustomer}
                setOpenViewModal={setOpenViewModal}
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No Customers Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
