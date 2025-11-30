// src/context/AuthContext.jsx
import { createContext, useState, useContext } from "react";
import { useCart } from "./CartContext";
import usuarios from "../api/usuarios"; // ← IMPORT CORRECTO

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicialización segura desde localStorage
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("ecom_user");
      if (!raw) return null;

      const parsed = JSON.parse(raw);

      return {
        id: parsed.id || null,
        email: parsed.email || "",
        name: parsed.name || "",
        role: parsed.role || "user",
      };
    } catch {
      return null;
    }
  });

  const { clearCart } = useCart();

  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  // 🔵 LOGIN usando archivo usuarios.js REAL
  const login = async (email, password) => {
    const found = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) return false;

    const safeUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    };

    setUser(safeUser);
    localStorage.setItem("ecom_user", JSON.stringify(safeUser));

    return true;
  };

  const logout = () => {
    clearCart();
    setUser(null);
    localStorage.removeItem("ecom_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        redirectAfterLogin,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
