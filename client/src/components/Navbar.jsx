import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // archivo CSS separado

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">VentasApp</Link>
        <Link to="/">Productos</Link>
        <Link to="/cart">Carrito</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span className="user-name">Hola, {user.name}</span>
            <button className="logout-btn" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
