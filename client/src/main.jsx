import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar"; // ✅ Import del componente Navbar

function AppLayout() {
  return (
    <div>
      {/* ✅ Aquí se usa el componente Navbar */}
      <Navbar />

      <hr />

      {/* ✅ Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);
