import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import About from "./components/About/About";
import Service from "./components/Service/Service";
import Dashboard from "./components/Admin/DashBoard/DashBoard";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import Products from "./components/Admin/Products/Products";
import Orders from "./components/Admin/Orders/Orders";
import Customers from "./components/Admin/Customers/Customers";
import Category from "./components/Admin/Categories/Categories";
import Coupons from "./components/Admin/Coupons/Coupons";
import Reports from "./components/Admin/Reports/Reports";
import Settings from "./components/Admin/Settings/Settings";
import Inventory from "./components/Admin/Inventory/Inventory";
import Profile from "./components/User/Profile/Profile";
function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  // أي صفحة تبدأ بـ /admin تعتبر صفحة أدمن
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isLoginPage && !isAdminPage && <Header />}
      {!isLoginPage && !isAdminPage && <Sidebar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/single-product/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service" element={<Service />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="category" element={<Category />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      {!isLoginPage && !isAdminPage && <Footer />}
    </>
  );
}

export default App;
