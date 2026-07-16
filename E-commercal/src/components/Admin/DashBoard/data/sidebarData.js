import {
    FaChartPie,
    FaBoxOpen,
    FaTags,
    FaShoppingCart,
    FaUsers,
    FaWallet,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

export const sidebarData = [

    {
        id: 1,
        title: "Dashboard",
        icon: FaChartPie,
        path: "/admin/dashboard",
    },

    {
        id: 2,
        title: "Products",
        icon: FaBoxOpen,
        path: "/admin/products",
    },

    {
        id: 3,
        title: "Categories",
        icon: FaTags,
        path: "/admin/categories",
    },

    {
        id: 4,
        title: "Orders",
        icon: FaShoppingCart,
        path: "/admin/orders",
    },

    {
        id: 5,
        title: "Customers",
        icon: FaUsers,
        path: "/admin/customers",
    },

    {
        id: 6,
        title: "Finance",
        icon: FaWallet,
        path: "/admin/finance",
    },

    {
        id: 7,
        title: "Reports",
        icon: FaChartBar,
        path: "/admin/reports",
    },

    {
        id: 8,
        title: "Settings",
        icon: FaCog,
        path: "/admin/settings",
    },

    {
        id: 9,
        title: "Logout",
        icon: FaSignOutAlt,
        path: "/logout",
    },
];