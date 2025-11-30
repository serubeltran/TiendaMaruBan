import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ecom_user")) || null;
    } catch {
      return null;
    }
  });

  // ⚠ recordatorio: para que Login vuelva al carrito
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("ecom_user", JSON.stringify(data));
  };

  const logout = () => {
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

// Hook obligatorio (para evitar errores de importación)
export const useAuth = () => useContext(AuthContext);
