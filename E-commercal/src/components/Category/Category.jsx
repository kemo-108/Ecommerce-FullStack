import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/CategoryService";

import "./Category.css";

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
      <div className="container">
        {loading && <p className="category-status">Loading categories...</p>}

        {!loading && categories.length === 0 && (
          <p className="category-status">No categories available yet.</p>
        )}

        {!loading && categories.length > 0 && (
          <div className="category-grid">
            {categories.map((cat, index) => (
              <Link
                to={`/shop?categoryId=${encodeURIComponent(cat.id)}`}
                className="category-tile"
                key={cat.id || cat.name}
              >
                <img
                  src={
                    cat.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
                  }
                  alt={cat.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
                  }}
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
