import { useEffect, useState } from "react";
import "./RecentCustomers.css";
import { getCustomers } from "../../../../../services/CustomersService";

const RecentCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers()
      .then((data) => {
        const sorted = [...data]
          .sort((a, b) => new Date(b.joined) - new Date(a.joined))
          .slice(0, 5);
        setCustomers(sorted);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="recent-customers">
      <div className="recent-customers-header">
        <h3>Recent Customers</h3>
      </div>

      <div className="customers-list">
        {customers.map((customer) => (
          <div className="customer-item" key={customer.customerId}>
            <img src={customer.avatar} alt={customer.customerName} />

            <div className="customer-info">
              <h4>{customer.customerName}</h4>
              <p>{customer.joined}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCustomers;
