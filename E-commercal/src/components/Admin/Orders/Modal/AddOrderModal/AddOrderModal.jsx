import { useEffect, useMemo, useState } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import "./AddOrderModal.css";
import { toast } from "react-toastify";
import { AdminCreateOrder } from "../../../../../services/OrderService";
import {
  getProducts,
  getProductById,
} from "../../../../../services/ProductService";

// One empty item row for the order-items table below.
const emptyItem = () => ({
  key: `${Date.now()}-${Math.random()}`,
  productId: "",
  productName: "",
  imageUrl: "",
  price: 0,
  stock: 0,
  quantity: 1,
  colors: [],
  sizes: [],
  colorName: "",
  colorHexCode: "",
  sizeName: "",
});

const AddOrderModal = ({ setOpenAddModal, refreshOrders }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    paymentStatus: "Pending",
    status: "Pending",
    source: "InStore",
  });

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [items, setItems] = useState([emptyItem()]);
  const [saving, setSaving] = useState(false);

  // Load the product catalog once so the admin can pick what the
  // walk-in customer actually bought instead of typing a total by hand.
  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : data?.products || []);
      } catch (error) {
        toast.error("Failed to load products.");
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItemRow = () => {
    setItems((prev) => [...prev, emptyItem()]);
  };

  const handleRemoveItemRow = (key) => {
    setItems((prev) =>
      prev.length === 1 ? prev : prev.filter((it) => it.key !== key),
    );
  };

  // When the admin picks a product for a row, pull its colors/sizes/stock
  // via the product-detail endpoint (the plain product list doesn't include them).
  const handleProductSelect = async (key, productId) => {
    const base = products.find(
      (p) => String(p.productId) === String(productId),
    );

    setItems((prev) =>
      prev.map((it) =>
        it.key === key
          ? {
              ...it,
              productId,
              productName: base?.productName || "",
              imageUrl: base?.imageUrl || "",
              price: base?.price || 0,
              stock: base?.stock ?? 0,
              colors: [],
              sizes: [],
              colorName: "",
              colorHexCode: "",
              sizeName: "",
            }
          : it,
      ),
    );

    if (!productId) return;

    try {
      const full = await getProductById(productId);
      setItems((prev) =>
        prev.map((it) =>
          it.key === key
            ? {
                ...it,
                colors: full?.colors || [],
                sizes: full?.sizes || [],
              }
            : it,
        ),
      );
    } catch {
      // Colors/sizes are optional metadata — if the lookup fails the
      // admin can still create the order without picking a variant.
    }
  };

  const handleItemChange = (key, field, value) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.key !== key) return it;
        if (field === "colorName") {
          const color = it.colors.find((c) => c.name === value);
          return {
            ...it,
            colorName: value,
            colorHexCode: color?.hexCode || "",
          };
        }
        return { ...it, [field]: value };
      }),
    );
  };

  const validItems = useMemo(
    () => items.filter((it) => it.productId && Number(it.quantity) > 0),
    [items],
  );

  const total = useMemo(
    () =>
      validItems.reduce(
        (sum, it) => sum + Number(it.price) * Number(it.quantity),
        0,
      ),
    [validItems],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validItems.length === 0) {
      toast.error("Add at least one product to the order.");
      return;
    }

    const overStock = validItems.find(
      (it) => Number(it.quantity) > Number(it.stock),
    );
    if (overStock) {
      toast.error(
        `"${overStock.productName}" only has ${overStock.stock} unit(s) in stock.`,
      );
      return;
    }

    setSaving(true);
    try {
      await AdminCreateOrder({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        total,
        paymentStatus: formData.paymentStatus,
        status: formData.status,
        source: formData.source,
        items: validItems.map((it) => ({
          productId: Number(it.productId),
          productName: it.productName,
          imageUrl: it.imageUrl,
          price: Number(it.price),
          quantity: Number(it.quantity),
          colorName: it.colorName || null,
          colorHexCode: it.colorHexCode || null,
          sizeName: it.sizeName || null,
        })),
      });
      toast.success("Order created successfully.");
      await refreshOrders();
      setOpenAddModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order.");
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

          <div className="form-group">
            <label>Order Items</label>

            <div className="order-items-table">
              {items.map((it) => (
                <div className="order-item-row" key={it.key}>
                  <select
                    className="item-product"
                    value={it.productId}
                    disabled={loadingProducts}
                    onChange={(e) =>
                      handleProductSelect(it.key, e.target.value)
                    }
                  >
                    <option value="">
                      {loadingProducts
                        ? "Loading products..."
                        : "Select product"}
                    </option>
                    {products.map((p) => (
                      <option
                        key={p.productId}
                        value={p.productId}
                        disabled={p.stock <= 0}
                      >
                        {p.productName} — ${p.price} ({p.stock} in stock)
                      </option>
                    ))}
                  </select>

                  {it.colors.length > 0 && (
                    <select
                      className="item-color"
                      value={it.colorName}
                      onChange={(e) =>
                        handleItemChange(it.key, "colorName", e.target.value)
                      }
                    >
                      <option value="">Color</option>
                      {it.colors.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  )}

                  {it.sizes.length > 0 && (
                    <select
                      className="item-size"
                      value={it.sizeName}
                      onChange={(e) =>
                        handleItemChange(it.key, "sizeName", e.target.value)
                      }
                    >
                      <option value="">Size</option>
                      {it.sizes.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  )}

                  <input
                    className="item-qty"
                    type="number"
                    min="1"
                    max={it.stock || undefined}
                    placeholder="Qty"
                    value={it.quantity}
                    onChange={(e) =>
                      handleItemChange(it.key, "quantity", e.target.value)
                    }
                  />

                  <span className="item-line-total">
                    ${(Number(it.price) * Number(it.quantity || 0)).toFixed(2)}
                  </span>

                  <button
                    type="button"
                    className="item-remove-btn"
                    onClick={() => handleRemoveItemRow(it.key)}
                    disabled={items.length === 1}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="add-item-btn"
              onClick={handleAddItemRow}
            >
              <FiPlus /> Add product
            </button>
          </div>

          <div className="order-total-row">
            <span>Order Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

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
              <label>Sale Channel</label>

              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="InStore">In-Store (walk-in)</option>
                <option value="Online">Online (phone/manual)</option>
              </select>
            </div>
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
