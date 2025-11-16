import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ToastContext } from '../context/ToastContext'

export default function Cart(){
  const { items, clearCart, total, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const { showToast } = useContext(ToastContext)

  const totalCount = items.reduce((s, i) => s + (i.qty || 0), 0)

  const handleIncrease = (id) => {
    increaseQuantity(id)
    showToast('Cantidad aumentada', { delay: 1200 })
  }

  const handleDecrease = (id) => {
    const currentItem = items.find(i => i.id === id)
    const isRemoving = currentItem && currentItem.qty === 1
    decreaseQuantity(id)
    showToast(isRemoving ? 'Producto eliminado' : 'Cantidad disminuida', { delay: 1200 })
  }

  const handleCheckout = () => {
    showToast('Compra simulada realizada. Gracias!', { delay: 1400 })
    clearCart()
  }

  return (
    <main className="container">
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Carrito</h2>
  <h3 className="mt-2 mb-0 fs-6 text-muted">Cantidad de productos: {totalCount}</h3>
      </div>
      {items.length === 0 ? <p>Tu carrito está vacío.</p> : (
        <div>
          {items.map(i => (
            <div key={i.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <img src={i.imagen} alt={i.titulo} className="img-fluid rounded-start img-uniform" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h4 className="card-title">{i.titulo}</h4>
                    <p className="card-text text-muted">Nombre: {i.titulo}</p>
                    <p className="card-text text-muted fs-5">Cantidad: {i.qty}</p>
                  </div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end pe-3">
                  <div className="text-end me-3">
                    <div className="fw-bold fs-5">${(i.precio * i.qty).toFixed(2)}</div> {/* Fuente y tamaño consistente */}
                  </div>
                  <div>
                    <button className="btn btn-sm btn-primary mx-1" onClick={() => handleIncrease(i.id)}>+</button>
                    <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDecrease(i.id)}>-</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-end align-items-center mt-3"> {/* Total a la derecha */}
            <strong className="me-3">Total: ${total.toFixed(2)}</strong>
            <div>
              <button className="btn btn-secondary me-2" onClick={clearCart}>Vaciar</button> {/* Mismo tamaño y formato */}
              <button className="btn btn-primary" onClick={handleCheckout}>Comprar</button>
            </div>
          </div>
        </div>
      )}

  {/* Los toasts se muestran mediante ToastContext (presentación global en App.jsx) */}
    </main>
  )
}