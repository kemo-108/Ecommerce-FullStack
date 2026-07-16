import "./LowStock.css";

const products = [
  {
    id: 1,
    name: "Gaming Mouse",
    stock: 3,
    image: "https://picsum.photos/60?11",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    stock: 5,
    image: "https://picsum.photos/60?12",
  },
  {
    id: 3,
    name: "AirPods Pro",
    stock: 6,
    image: "https://picsum.photos/60?13",
  },
  {
    id: 4,
    name: "iPhone 16 Pro",
    stock: 2,
    image: "https://picsum.photos/60?14",
  },
];

const LowStock = () => {
  return (
    <div className="low-stock">
      <div className="low-stock-header">
        <h3>Low Stock Products</h3>

        <button>View All</button>
      </div>

      <div className="low-stock-list">
        {products.map((item) => (
          <div className="low-stock-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="low-stock-info">
              <h4>{item.name}</h4>
              <span>Stock : {item.stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStock;
