import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, loading, error } = useContext(ProductsContext);
  const { addToCart, isProductInCart } = useContext(CartContext);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Carga solo los primeros 12 productos inicialmente para mejorar LCP
  useEffect(() => {
    if (products && products.length > 0) {
      setDisplayedProducts(products.slice(0, 12));
    }
  }, [products]);

  // Carga más productos cuando el usuario desplaza
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        // Carga más productos cuando el usuario está cerca del final
        setDisplayedProducts((prev) => {
          const nextIndex = prev.length;
          const newProducts = products.slice(nextIndex, nextIndex + 8);
          return newProducts.length > 0 ? [...prev, ...newProducts] : prev;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products]);

  const handleAdd = (product) => {
    addToCart(product);
  };

  // Carga de Productos
  if (loading) {
    return (
      <main className="container py-4">
        <p>Cargando productos...</p>
      </main>
    );
  }

  // Error durante fetch
  if (error) {
    return (
      <main className="container py-4">
        <p style={{ color: "red" }}>Error al cargar productos: {error}</p>
      </main>
    );
  }

  // Lista vacía o undefined
  if (!products || products.length === 0) {
    return (
      <main className="container py-4">
        <p>No hay productos para mostrar.</p>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {displayedProducts.map((p) => (
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
