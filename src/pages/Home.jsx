import React, { useContext } from 'react'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../context/CartContext'
import { ToastContext } from '../context/ToastContext'
import { useProducts } from '../context/ProductsContext'

export default function Home(){
  const { products, loading } = useProducts()
  const { addToCart, items } = useContext(CartContext)
  const { showToast } = useContext(ToastContext)

  const handleAdd = (p)=>{
    addToCart(p,1)
    showToast('Producto añadido al carrito', { delay: 1000 })
  }

  const isProductInCart = (productId) => {
    return items.some(item => item.id === productId)
  }

  return (
    <main className="container py-4">
      <header className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-3">
        <div>
          <h2 className="h4 mb-1">Productos</h2>
          <p className="mb-0 text-muted small">Explora nuestra selección. Haz clic en "Ver" para detalles.</p>
        </div>
        {/* Si necesitas botones de filtro/búsqueda, van aquí en la esquina derecha */}
      </header>

      {/* Grid responsivo: 1 columna en xs, 2 en sm, 3 en md, 4 en lg+ */}
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : (
        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {products.map(p=> (
            <div className="col" key={p.id}>
              <ProductCard 
                producto={p} 
                onAdd={handleAdd} 
                isInCart={isProductInCart(p.id)}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
