import { useMemo, useState } from "react";
//test
import "./Categories.css";

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
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Phones, Laptops, Tablets and Electronic Accessories",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
      products: 52,
      featured: true,
      status: "Active",
      createdAt: "2 Jun 2026",
      createdTime: "10:30 AM",
    },
    {
      id: 2,
      name: "Shoes",
      description: "Men, Women and Kids Footwear",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
      products: 33,
      featured: true,
      status: "Active",
      createdAt: "5 Jun 2026",
      createdTime: "09:15 AM",
    },
    {
      id: 3,
      name: "Watches",
      description: "Men and Women Wrist Watches",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200",
      products: 16,
      featured: false,
      status: "Hidden",
      createdAt: "9 Jun 2026",
      createdTime: "02:45 PM",
    },
    {
      id: 4,
      name: "Bags",
      description: "Handbags, Backpacks and Travel Bags",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200",
      products: 28,
      featured: true,
      status: "Active",
      createdAt: "12 Jun 2026",
      createdTime: "11:20 AM",
    },
    {
      id: 5,
      name: "Sunglasses",
      description: "Men and Women Sunglasses",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200",
      products: 18,
      featured: false,
      status: "Active",
      createdAt: "14 Jun 2026",
      createdTime: "01:10 PM",
    },
  ]);

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
          setCategories={setCategories}
          setOpenEditModal={setOpenEditModal}
        />
      )}

      {openDeleteModal && (
        <DeleteCategoryModal
          category={selectedCategory}
          setCategories={setCategories}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {openAddModal && (
        <AddCategoryModal
          setOpenAddModal={setOpenAddModal}
          setCategories={setCategories}
        />
      )}
    </div>
  );
};

export default Categories;
