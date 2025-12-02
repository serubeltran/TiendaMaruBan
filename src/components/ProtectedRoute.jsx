// Control del login para rutas protegidas

import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return (
      <div
        style={{
          maxWidth: "420px",
          margin: "40px auto",
          padding: "20px",
          background: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        <h3 style={{ marginBottom: "12px" }}>Necesitás iniciar sesión</h3>
        <p style={{ color: "#6b7280", marginBottom: "16px" }}>
          Debes autenticarte para acceder a esta sección.
        </p>

        <Link
          to="/login"
          state={{ from: location }}
          className="btn"
          style={{ display: "inline-block" }}
        >
          Ir al login
        </Link>
      </div>
    );
  }

  return children;
}
