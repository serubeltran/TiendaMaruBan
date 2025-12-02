// Contexto para el carrito

import { createContext, useState, useMemo, useContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const normalizedProduct = {
      ...product,
      imagen: product.imagen || product.IMAGEN || product.Imagen || "",
    };

    setCart((prev) => {
      const existing = prev.find((item) => item.id === normalizedProduct.id);
      if (existing) {
        return prev.map((item) =>
          item.id === normalizedProduct.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...normalizedProduct, qty: 1 }];
    });
  };

  // Eliminar el producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Aumentar cantidad carrito
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Disminuir cantidad carrito
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.precio * item.qty, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total,
        isProductInCart: (id) => cart.some((i) => i.id === id),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
