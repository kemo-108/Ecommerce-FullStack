import "./TopProducts.css";

const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    category: "Smartphones",
    sales: 120,
    image: "https://picsum.photos/60?1",
  },
  {
    id: 2,
    name: "Nike Air Max",
    category: "Shoes",
    sales: 95,
    image: "https://picsum.photos/60?2",
  },
  {
    id: 3,
    name: "Apple Watch",
    category: "Accessories",
    sales: 70,
    image: "https://picsum.photos/60?3",
  },
  {
    id: 4,
    name: "AirPods Pro",
    category: "Audio",
    sales: 65,
    image: "https://picsum.photos/60?4",
  },
];

const TopProducts = () => {
  return (
    <div className="top-products">
      <div className="top-products-header">
        <h3>Top Selling Products</h3>

        <button>View All</button>
      </div>

      <div className="top-products-list">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.image} alt={product.name} />

            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.category}</p>
            </div>

            <span>{product.sales} Sales</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
