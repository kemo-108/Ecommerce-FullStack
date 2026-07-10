import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./Products.css";
import { getProducts } from "../../../services/ProductService";

import ProductsHeader from "./ProductsHeader";
import ProductsFilters from "./ProductsFilters";
import ProductsStats from "./ProductsStats";
import ProductsTable from "./ProductsTable";
import ProductsPagination from "./ProductsPagination";

import AddProductModal from "./Modal/AddProductModal/AddProductModal";
import ViewProductModal from "./Modal/ViewProductModal/ViewProductModal";
import EditProductModal from "./Modal/EditProductModal/EditProductModal";
import DeleteProductModal from "./Modal/DeleteProductModal/DeleteProductModal";

const Products = () => {
  const [searchParams] = useSearchParams();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [product, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Newest");

  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="products-page">
        <h2 style={{ textAlign: "center", padding: "100px" }}>
          Loading Products...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <h2 style={{ textAlign: "center", color: "red", padding: "100px" }}>
          {error}
        </h2>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All Status" ||
      (selectedStatus === "In Stock" && product.qty > 10) ||
      (selectedStatus === "Low Stock" &&
        product.qty > 0 &&
        product.qty <= 10) ||
      (selectedStatus === "Out Of Stock" && product.qty === 0);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Newest":
        return b.productId - a.productId;

      case "Oldest":
        return a.productId - b.productId;

      case "PriceHigh":
        return b.price - a.price;

      case "PriceLow":
        return a.price - b.price;

      case "StockHigh":
        return b.qty - a.qty;

      case "StockLow":
        return a.qty - b.qty;

      default:
        return 0;
    }
  });

  return (
    <div className="products-page">
      <ProductsHeader setOpenAddModal={setOpenAddModal} />

      <ProductsFilters
        products={products}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <ProductsStats products={products} />

      <ProductsTable
        products={sortedProducts}
        currentPage={currentPage}
        productsPerPage={PRODUCTS_PER_PAGE}
        setOpenViewModal={setOpenViewModal}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setSelectedProduct={setSelectedProduct}
      />

      <ProductsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={sortedProducts.length}
        productsPerPage={PRODUCTS_PER_PAGE}
      />

      {openAddModal && <AddProductModal setOpenAddModal={setOpenAddModal} />}

      {openViewModal && (
        <ViewProductModal
          product={product}
          setOpenViewModal={setOpenViewModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}

      {openEditModal && (
        <EditProductModal
          product={product}
          setOpenEditModal={setOpenEditModal}
        />
      )}

      {openDeleteModal && (
        <DeleteProductModal
          product={product}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </div>
  );
};

export default Products;
