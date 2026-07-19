import { useEffect, useMemo, useState } from "react";
import { FiX, FiPlus, FiMinus, FiTrash2, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import "./AddOrderModal.css";
import getProducts from "../../../../../services/ProductService";
import { CreateOrder } from "../../../../../services/OrderService";

const AddOrderModal = ({ setOpenAddModal, onSaved }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    paymentStatus: "Pending",
    status: "Pending",
  });

  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProducts().then((data) => setProducts(data || []));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredProducts = useMemo(() => {
    const term = productSearch.toLowerCase().trim();
    if (!term) return [];
    return products
      .filter((p) => p.productName.toLowerCase().includes(term))
      .slice(0, 6);
  }, [productSearch, products]);

  const addProduct = (product) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.productId === product.productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.productId,
          productName: product.productName,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1,
        },
      ];
    });
    setProductSearch("");
  };

  const updateQuantity = (productId, delta) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setOrderItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.customerEmail.trim()) {
      toast.error("Please enter the customer's name and email");
      return;
    }

    if (orderItems.length === 0) {
      toast.error("Please add at least one product to the order");
      return;
    }

    setSaving(true);
    try {
      await CreateOrder({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        paymentStatus: formData.paymentStatus,
        status: formData.status,
        items: orderItems,
        total,
      });

      toast.success("Order created successfully.");
      onSaved?.();
      setOpenAddModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Could not create the order."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setOpenAddModal(false)}>
      <div className="add-order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Order</h2>

          <button onClick={() => setOpenAddModal(false)}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name</label>

            <input
              type="text"
              name="customerName"
              placeholder="Enter customer name"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Customer Email</label>

            <input
              type="email"
              name="customerEmail"
              placeholder="Enter customer email"
              value={formData.customerEmail}
              onChange={handleChange}
            />
          </div>

          {/* ================= Product picker ================= */}
          <div className="form-group">
            <label>Products</label>

            <div className="product-search-box">
              <FiSearch />
              <input
                type="text"
                placeholder="Search for a product to add..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>

            {filteredProducts.length > 0 && (
              <div className="product-search-results">
                {filteredProducts.map((product) => (
                  <button
                    type="button"
                    key={product.productId}
                    className="product-search-item"
                    onClick={() => addProduct(product)}
                  >
                    <img
                      src={`https://localhost:7069/${product.imageUrl}`}
                      alt={product.productName}
                    />
                    <span>{product.productName}</span>
                    <strong>${Number(product.price).toFixed(2)}</strong>
                    <FiPlus />
                  </button>
                ))}
              </div>
            )}
          </div>

          {orderItems.length > 0 && (
            <div className="order-items-list">
              {orderItems.map((item) => (
                <div className="order-item-row" key={item.productId}>
                  <img
                    src={`https://localhost:7069/${item.imageUrl}`}
                    alt={item.productName}
                  />

                  <span className="order-item-name">{item.productName}</span>

                  <div className="qty-control">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, -1)}
                    >
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>

                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() => removeItem(item.productId)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}

              <div className="order-total-row">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>
          )}

          <div className="two-columns">
            <div className="form-group">
              <label>Payment Status</label>

              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>Paid</option>
                <option>Failed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Order Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenAddModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Creating..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;
