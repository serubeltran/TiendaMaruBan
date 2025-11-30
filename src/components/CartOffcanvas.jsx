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

return ( <Offcanvas show={show} onHide={handleClose} placement="end">
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
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <img
                src={item.imagen}
                alt={item.title}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 6,
                  objectFit: "cover",
                  marginRight: 10,
                }}
              />

              <div style={{ flex: 1 }}>
                <strong>{item.title}</strong>
                <br />

                {/* Precio un renglón arriba */}
                <span>Precio: ${item.precio.toFixed(2)}</span>
                <br />

                {/* Subtotal con tamaño menor y negrita */}
                <span style={{ fontSize: "0.9em", fontWeight: "bold" }}>
                  Subtotal: ${(item.precio * item.qty).toFixed(2)}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  –
                </Button>

                {/* Espacio fijo de 3 dígitos */}
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

        {/* Botones inferiores */}
        <div style={{ marginTop: 15 }}>
          <h5 style={{ textAlign: "right" }}>Total: ${total.toFixed(2)}</h5>

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
