import {
  FiBarChart2,
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiArchive,
  FiTag,
  FiStar,
} from "react-icons/fi";

export const reportsTabs = [
  {
    id: "sales",
    label: "Sales",
    icon: FiBarChart2,
  },
  {
    id: "products",
    label: "Products",
    icon: FiPackage,
  },
  {
    id: "customers",
    label: "Customers",
    icon: FiUsers,
  },
  {
    id: "finance",
    label: "Finance",
    icon: FiDollarSign,
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: FiArchive,
  },
  {
    id: "coupons",
    label: "Coupons",
    icon: FiTag,
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: FiStar,
  },
];

export default reportsTabs;