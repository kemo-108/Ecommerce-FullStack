import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Cart from "./components/Cart/Cart";
import CheckOut from "./components/CheckOut/CheckOut";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Header/Sidebar";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import PublicCategory from "./components/Category/Category";
import WishList from "./components/User/WishList/WishList";
import Dashboard from "./components/Admin/DashBoard/DashBoard";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import Products from "./components/Admin/Products/Products";
import Orders from "./components/Admin/Orders/Orders";
import Customers from "./components/Admin/Customers/Customers";
import AdminCategories from "./components/Admin/Categories/Categories";
import Coupons from "./components/Admin/Coupons/Coupons";
import Reports from "./components/Admin/Reports/Reports";
import Settings from "./components/Admin/Settings/Settings";
import Inventory from "./components/Admin/Inventory/Inventory";
import Profile from "./components/User/Profile/Profile";
import Account from "./components/User/Account/Account";
import MyOrder from "./components/User/MyOrder/MyOrder";
import Addresses from "./components/User/Addresses/Addresses";
import Security from "./components/User/Security/Security";
import Returns from "./components/User/Returns/Returns";
import Refunds from "./components/Admin/Refunds/Refunds";

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  // أي صفحة تبدأ بـ /admin تعتبر صفحة أدمن
  const isAdminPage = location.pathname.startsWith("/admin");

  const isAccountPage = location.pathname.startsWith("/account");

  return (
    <>
      {!isAuthPage && !isAdminPage && !isAccountPage && <Header />}
      {!isAuthPage && !isAdminPage && !isAccountPage && <Sidebar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category" element={<PublicCategory />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/single-product/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/account" element={<Account />}>
          <Route index element={<Navigate to="/account/profile" replace />} />

          <Route path="profile" element={<Profile />} />

          <Route path="orders" element={<MyOrder />} />

          <Route path="addresses" element={<Addresses />} />

          <Route path="security" element={<Security />} />

          <Route path="returns" element={<Returns />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="category" element={<AdminCategories />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="refunds" element={<Refunds />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      {!isAuthPage && !isAdminPage && !isAccountPage && <Footer />}
    </>
  );
}

export default App;
