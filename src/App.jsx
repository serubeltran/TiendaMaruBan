import React, { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartOffcanvas from "./components/CartOffcanvas";
import ToastPlacement from "./components/ToastPlacement";
import AdminRoute from "./components/AdminRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginOffcanvas from "./components/LoginOffcanvas";

// Lazy load para páginas no críticas
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Stock = lazy(() => import("./pages/Stock"));
const Login = lazy(() => import("./pages/Login"));
const Nosotros = lazy(() => import("./pages/Nosotros"));

// Componente de fallback para carga
const LoadingFallback = () => (
  <div className="container py-5 text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginRequestedByCart, setLoginRequestedByCart] = useState(false);

  // LOGIN solicitado desde carrito
  const handleRequireLoginFromCart = () => {
    setShowCart(false);
    setLoginRequestedByCart(true);  // recuerda que el login fue por carrito
    setShowLogin(true);
  };

  // LOGIN exitoso → volver a carrito si fue solicitado desde carrito
  const handleSuccessfulLogin = () => {
    setShowLogin(false);

    if (loginRequestedByCart) {
      setLoginRequestedByCart(false);
      setShowCart(true);               // reabrir carrito automáticamente
    }
  };

  return (
    <div className="app">
      <Header
        onCartClick={() => setShowCart(true)}
        onLoginClick={() => setShowLogin(true)}
      />

      <div style={{ position: "relative" }}>
        <ToastPlacement />
      </div>

      <div className="container">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/stock"
                element={
                  <AdminRoute>
                    <Stock />
                  </AdminRoute>
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>

      <Footer />

      {/* Carrito */}
      <CartOffcanvas
        show={showCart}
        handleClose={() => setShowCart(false)}
        onRequireLogin={handleRequireLoginFromCart}
      />

      {/* Login en Offcanvas */}
      <LoginOffcanvas
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleSuccessfulLogin}
      />
    </div>
  );
}
