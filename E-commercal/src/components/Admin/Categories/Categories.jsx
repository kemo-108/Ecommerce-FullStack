import { useEffect, useMemo, useState } from "react";
import "./Categories.css";
import { getCategories } from "../../../services/CategoryService";

import CategoriesHeader from "./CategoriesHeader";
import CategoriesFilters from "./CategoriesFilters";
import CategoriesStats from "./CategoriesStats";
import CategoriesTable from "./CategoriesTable";
import CategoriesPagination from "./CategoriesPagination";

import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import ViewCategoryModal from "./ViewCategoryModal/ViewCategoryModal";
import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal/DeleteCategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedFeatured, setSelectedFeatured] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const CATEGORIES_PER_PAGE = 8;

  // Filter + Sort
  const filteredCategories = useMemo(() => {
    let data = [...categories];

    // Search
    if (searchTerm.trim()) {
      data = data.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status
    if (selectedStatus !== "All Status") {
      data = data.filter((category) => category.status === selectedStatus);
    }

    // Featured
    if (selectedFeatured === "Featured") {
      data = data.filter((category) => category.featured);
    }

    if (selectedFeatured === "Not Featured") {
      data = data.filter((category) => !category.featured);
    }

    // Sort
    switch (sortBy) {
      case "Name A-Z":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Name Z-A":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "Products High":
        data.sort((a, b) => b.products - a.products);
        break;

      case "Products Low":
        data.sort((a, b) => a.products - b.products);
        break;

      default:
        break;
    }

    return data;
  }, [categories, searchTerm, selectedStatus, selectedFeatured, sortBy]);

  // Pagination
  const lastIndex = currentPage * CATEGORIES_PER_PAGE;
  const firstIndex = lastIndex - CATEGORIES_PER_PAGE;

  const currentCategories = filteredCategories.slice(firstIndex, lastIndex);

  return (
    <div className="categories-page">
      <CategoriesHeader setOpenAddModal={setOpenAddModal} />

      <CategoriesFilters
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedFeatured={selectedFeatured}
        setSelectedFeatured={setSelectedFeatured}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <CategoriesStats categories={categories} />

      <CategoriesTable
        categories={currentCategories}
        setSelectedCategory={setSelectedCategory}
        setOpenViewModal={setOpenViewModal}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      <CategoriesPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCategories={filteredCategories.length}
        categoriesPerPage={CATEGORIES_PER_PAGE}
      />

      {openViewModal && (
        <ViewCategoryModal
          category={selectedCategory}
          setOpenViewModal={setOpenViewModal}
        />
      )}

      {openEditModal && (
        <EditCategoryModal
          category={selectedCategory}
          onSaved={fetchCategories}
          setOpenEditModal={setOpenEditModal}
        />
      )}

      {openDeleteModal && (
        <DeleteCategoryModal
          category={selectedCategory}
          onDeleted={fetchCategories}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {openAddModal && (
        <AddCategoryModal
          setOpenAddModal={setOpenAddModal}
          onSaved={fetchCategories}
        />
      )}
    </div>
  );
};

export default Categories;
