import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
  } = useContext(CartContext);

  const handleDecrease = (id, qty) => {
    if (qty === 1) {
      removeFromCart(id);
    } else {
      decreaseQuantity(id);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Tu Carrito</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">El carrito está vacío.</div>
      ) : (
        <>
          <div className="card shadow-sm p-3 mb-4">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      {/* Nombre */}
                      <td className="fw-semibold">{item.nombre}</td>

                      {/* Cantidad con + y - */}
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleDecrease(item.id, item.qty)}
                          >
                            –
                          </button>

                          <span className="fw-semibold">{item.qty}</span>

                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="text-end fw-bold">
                        ${item.precio * item.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total final */}
          <div className="card p-3 shadow-sm">
            <h4 className="fw-bold text-end">
              Total: <span className="text-success">${total}</span>
            </h4>

            <div className="d-flex justify-content-end mt-3 gap-2">
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Vaciar Carrito
              </button>

              <button className="btn btn-primary">
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
