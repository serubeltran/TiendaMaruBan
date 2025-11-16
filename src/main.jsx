import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext'
import { ProductsProvider } from './context/ProductsContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <ProductsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProductsProvider>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
