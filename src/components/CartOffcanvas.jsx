import React, { useContext, useState } from "react";
import { Offcanvas, Button, Modal } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

export default function CartOffcanvas({ show, handleClose, onRequireLogin }) {
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, total } = useCart();
  const { user } = useAuth();
  const { showToast } = useContext(ToastContext);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  if (!user && show) {
    handleClose();
    onRequireLogin();
    return null;
  }

  const handlePay = () => {
    alert("¡Gracias por tu compra!");
    clearCart();
    handleClose();
  };

  const handleRemoveProduct = (productId, productTitle) => {
    removeFromCart(productId);
    showToast(`${productTitle} eliminado del carrito`, { delay: 2000, bg: 'warning' });
  };

  const handleDecreaseQuantity = (productId, newQty, productTitle) => {
    decreaseQuantity(productId);
    // Si la cantidad llega a 0, mostrar mensaje de eliminación
    if (newQty === 1) {
      showToast(`${productTitle} eliminado del carrito`, { delay: 2000, bg: 'warning' });
    }
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Carrito vaciado correctamente', { delay: 2000, bg: 'info' });
    handleClose();
  };

  const confirmClearCart = () => {
    setShowConfirmClear(false);
    handleClearCart();
  };

  const totalProducts = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            El carrito está vacío.
          </p>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: "1px solid #e5e7eb",
                    gap: 12,
                    flexWrap: 'wrap'
                  }}
                >
                  {/* Imagen más grande */}
                  <img
                    src={item.imagen}
                    alt={item.title}
                    style={{
                      width: 'clamp(50px, 15vw, 65px)',
                      height: 'clamp(50px, 15vw, 65px)',
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />

                  {/* Contenido textual alineado */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: '120px' }}>
                    <span style={{ fontSize: "clamp(0.75em, 2.5vw, 0.9em)", fontStyle: "italic", fontWeight: 600 }}>{item.titulo}</span>

                    <span style={{ fontSize: "clamp(0.75em, 2.5vw, 0.85em)" }}>
                      Precio: ${item.precio.toFixed(2)}
                    </span>

                    <span style={{ fontSize: "clamp(0.8em, 2.5vw, 0.9em)" }}>
                      Subtotal: ${(item.precio * item.qty).toFixed(2)}
                    </span>
                  </div>

                  {/* Controles de cantidad */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: 'wrap', width: '100%', justifyContent: 'flex-end' }}>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => handleDecreaseQuantity(item.id, item.qty, item.titulo)}
                      style={{fontSize: 'clamp(11px, 2.5vw, 13px)', padding: 'clamp(3px, 1.5vw, 5px) clamp(6px, 2vw, 8px)'}}
                    >
                      –
                    </Button>

                    <span style={{ display: "inline-block", width: 'clamp(28px, 6vw, 35px)', textAlign: "center", fontSize: 'clamp(12px, 2.5vw, 14px)' }}>
                      {item.qty}
                    </span>

                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => increaseQuantity(item.id)}
                      style={{fontSize: 'clamp(11px, 2.5vw, 13px)', padding: 'clamp(3px, 1.5vw, 5px) clamp(6px, 2vw, 8px)'}}
                    >
                      +
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemoveProduct(item.id, item.titulo)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Zona inferior */}
            <div style={{ marginTop: 15 }}>
              
              {/* Cantidad de productos */}
              <h6 style={{ textAlign: "left", marginBottom: 4, fontSize: 'clamp(0.85em, 3vw, 1em)' }}>
                Cantidad de productos: {totalProducts}
              </h6>
              <hr style={{ width: "90%", margin: "0 auto" }} />

              {/* Total alineado a la izquierda */}
              <h5 style={{ textAlign: "left", fontSize: 'clamp(1em, 3.5vw, 1.25em)' }}>
                Total a pagar: ${total.toFixed(2)}
              </h5>

              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <Button
                  variant="danger"
                  style={{ flex: 1, minWidth: '120px', fontSize: 'clamp(11px, 2.5vw, 13px)', padding: 'clamp(6px, 2vw, 8px) clamp(10px, 3vw, 12px)' }}
                  onClick={() => setShowConfirmClear(true)}
                >
                  Vaciar carrito
                </Button>

                <Button
                  variant="success"
                  style={{ flex: 1, minWidth: '120px', fontSize: 'clamp(11px, 2.5vw, 13px)', padding: 'clamp(6px, 2vw, 8px) clamp(10px, 3vw, 12px)' }}
                  onClick={handlePay}
                >
                  Pagar
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>

      <Modal show={showConfirmClear} onHide={() => setShowConfirmClear(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar vaciado de carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres vaciar el carrito? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmClear(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmClearCart}>
            Vaciar carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </Offcanvas>
  );
}
