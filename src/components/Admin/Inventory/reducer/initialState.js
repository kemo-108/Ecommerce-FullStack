export const initialState = {
  products: [],

  search: "",

  status: "All Status",

  category: "All Categories",

  warehouse: "All Warehouses",

  sortBy: "lastUpdated",

  currentPage: 1,

  pageSize: 10,

  loading: false,

  error: null,

  selectedProduct: null,

  modals: {
    view: false,
    edit: false,
    delete: false,
    updateStock: false,
    add: false,
  },
};