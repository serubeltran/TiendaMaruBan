import React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CartOffcanvas({ show, handleClose, onRequireLogin }) {
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, total } = useCart();
  const { user } = useAuth();

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
                    padding: "10px 0",
                    borderBottom: "1px solid #e5e7eb",
                    gap: 10,
                  }}
                >
                  {/* Imagen más grande */}
                  <img
                    src={item.imagen}
                    alt={item.title}
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />

                  {/* Contenido textual alineado */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.8em", fontStyle: "italic" }}>{item.titulo}</span>

                    <span style={{ fontSize: "0.8em" }}>
                      Precio: ${item.precio.toFixed(2)}
                    </span>

                    <span style={{ fontSize: "0.9em" }}>
                      Subtotal: ${(item.precio * item.qty).toFixed(2)}
                    </span>
                  </div>

                  {/* Controles de cantidad */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      –
                    </Button>

                    <span style={{ display: "inline-block", width: 30, textAlign: "center" }}>
                      {item.qty}
                    </span>

                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
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
              <h7 style={{ textAlign: "left", marginBottom: 4 }}>
                Cantidad de productos: {totalProducts}
              </h7>
              <hr style={{ width: "90%", margin: "0 auto" }} />

              {/* Total alineado a la izquierda */}
              <h5 style={{ textAlign: "left" }}>
                Total a pagar: ${total.toFixed(2)}
              </h5>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <Button
                  variant="danger"
                  style={{ flex: 1 }}
                  onClick={clearCart}
                >
                  Vaciar carrito
                </Button>

                <Button
                  variant="success"
                  style={{ flex: 1 }}
                  onClick={handlePay}
                >
                  Pagar
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
