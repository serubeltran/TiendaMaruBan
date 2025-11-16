import React, { useState } from 'react' // Agregado useState
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Stock from './pages/Stock'
import Login from './pages/Login'
import Nosotros from './pages/Nosotros'
import CartOffcanvas from './components/CartOffcanvas' // Nuevo import; ajusta si lo pones en components/
import ToastPlacement from './components/ToastPlacement'
import AdminRoute from './components/AdminRoute'
import ErrorBoundary from './components/ErrorBoundary'

export default function App(){
  const [showCart, setShowCart] = useState(false) // State para Offcanvas

  return (
    <div className="app">
      <Header onCartClick={() => setShowCart(true)} /> {/* Prop para abrir carrito */}
      {/* Toasts globales: ToastPlacement se renderiza aquí para estar presente en todas las rutas */}
      <div style={{ position: 'relative' }}>
        <ToastPlacement />
      </div>
      <div className="container">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/stock" element={<AdminRoute><Stock /></AdminRoute>} />
            {/* Removida ruta /cart */}
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
      <CartOffcanvas show={showCart} handleClose={() => setShowCart(false)} /> {/* Agregado Offcanvas */}
    </div>
  )
}