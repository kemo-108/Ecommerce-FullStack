import "./RecentCustomers.css";

const customers = [
  {
    id: 1,
    name: "Ahmed Mostafa",
    date: "24 May 2025",
    image: "https://picsum.photos/60?21",
  },
  {
    id: 2,
    name: "Sara Ali",
    date: "23 May 2025",
    image: "https://picsum.photos/60?22",
  },
  {
    id: 3,
    name: "Mohamed Hassan",
    date: "22 May 2025",
    image: "https://picsum.photos/60?23",
  },
  {
    id: 4,
    name: "Omar Khaled",
    date: "21 May 2025",
    image: "https://picsum.photos/60?24",
  },
];

const RecentCustomers = () => {
  return (
    <div className="recent-customers">
      <div className="recent-customers-header">
        <h3>Recent Customers</h3>

        <button>View All</button>
      </div>

      <div className="customers-list">
        {customers.map((customer) => (
          <div className="customer-item" key={customer.id}>
            <img src={customer.image} alt={customer.name} />

            <div className="customer-info">
              <h4>{customer.name}</h4>
              <p>{customer.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCustomers;
