import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/CategoryService";
import CategoryImg1 from "../../image/category1.png";
import CategoryImg2 from "../../image/category2.png";
import CategoryImg3 from "../../image/category3.png";
import CategoryImg4 from "../../image/category4.png";
import "./Category.css";

const FALLBACK_IMAGES = [CategoryImg1, CategoryImg2, CategoryImg3, CategoryImg4];

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="category-page">
      <div className="category-banner">
        <h1>Shop by Category</h1>
        <p>Browse our full range of stationery and art supplies</p>
      </div>

      <div className="container">
        {loading && <p className="category-status">Loading categories...</p>}

        {!loading && categories.length === 0 && (
          <p className="category-status">No categories available yet.</p>
        )}

        {!loading && categories.length > 0 && (
          <div className="category-grid">
            {categories.map((cat, index) => (
              <Link
                to={`/shop?search=${encodeURIComponent(cat.name)}`}
                className="category-tile"
                key={cat.id || cat.name}
              >
                <img
                  src={
                    cat.image
                      ? `https://localhost:7069/${cat.image}`
                      : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
                  }
                  alt={cat.name}
                />
                <div className="category-tile-info">
                  <h3>{cat.name}</h3>
                  {cat.description && <p>{cat.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
