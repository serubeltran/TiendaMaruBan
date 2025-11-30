import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, loading, error } = useContext(ProductsContext);
  const { addToCart, isProductInCart } = useContext(CartContext);

  const handleAdd = (product) => {
    addToCart(product);
  };

  // ⛔ Loading
  if (loading) {
    return (
      <main className="container py-4">
        <p>Cargando productos...</p>
      </main>
    );
  }

  // ⛔ Error durante fetch
  if (error) {
    return (
      <main className="container py-4">
        <p style={{ color: "red" }}>Error al cargar productos: {error}</p>
      </main>
    );
  }

  // ⛔ Lista vacía o undefined
  if (!products || products.length === 0) {
    return (
      <main className="container py-4">
        <p>No hay productos para mostrar.</p>
      </main>
    );
  }

  // 👍 Render normal
  return (
    <main className="container py-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((p) => (
          <div className="col" key={p.id}>
            <ProductCard
              producto={p}
              onAdd={handleAdd}
              isInCart={isProductInCart(p.id)}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
