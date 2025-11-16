import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/authContext' // Import correcto
import { Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom' // Para link a login si no autenticado

const CartOffcanvas = ({ show, handleClose }) => {
  const { items, clearCart, total, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const { user } = useContext(AuthContext) // Uso real de user
  const totalCount = items.reduce((s, i) => s + (i.qty || 0), 0)

  const handleCheckout = () => {
    clearCart()
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <div>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
  <div className="text-muted small mt-1">Cantidad de productos: {totalCount}</div>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {!user ? (
          <p>Inicia sesión para ver el carrito. <Link to="/login" onClick={handleClose}>Ir a login</Link></p>
        ) : items.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div>
            {items.map(i => (
              <div key={i.id} className="card mb-3">
                <div className="row g-0 align-items-center">
                  <div className="col-3">
                    <img src={i.imagen} alt={i.titulo} className="img-fluid rounded img-uniform" />
                  </div>
                  <div className="col-9 ps-3">
                    <h5 className="mb-2">{i.titulo}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="input-group input-group-sm" style={{width: 'auto'}}>
                        <button className="btn btn-outline-danger" onClick={() => decreaseQuantity(i.id)}>-</button>
                        <span className="input-group-text">{i.qty}</span>
                        <button className="btn btn-outline-primary" onClick={() => increaseQuantity(i.id)}>+</button>
                      </div>
                      <div className="fw-bold">${(i.precio * i.qty).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>
      {user && items.length > 0 && (
        <div className="bg-light p-3 border-top position-sticky bottom-0">
          <div className="d-flex justify-content-between align-items-center">
            <strong>Total: ${total.toFixed(2)}</strong>
            <div>
              <button className="btn btn-secondary me-2" onClick={clearCart}>Vaciar</button>
              <button className="btn btn-primary" onClick={handleCheckout}>Finalizar compra</button>
            </div>
          </div>
        </div>
      )}
    </Offcanvas>
  )
}

export default CartOffcanvas