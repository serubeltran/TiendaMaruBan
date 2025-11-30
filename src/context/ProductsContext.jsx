import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from "react";

const API_URL =
  "https://68f28b54b36f9750deecfadc.mockapi.io/api/maru/artesanias";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();

      console.log("[DEBUG] API PRODUCTS:", data);

      // 🔥 Convertimos precio a number aquí
      const productosTransformados = data.map((item) => ({
        id: item.id,
        titulo: item.producto,
        precio: Number(item.precio),   // ← CONVERSIÓN A NÚMERO
        imagen: item.imagen,
        descripcion: item.descripcion,
      }));

      console.log("[DEBUG] TRANSFORMED PRODUCTS:", productosTransformados);

      setProducts(productosTransformados);
      setError(null);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("[DEBUG] PRODUCTS IN CONTEXT (STATE):", products);
  }, [products]);

  const getById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        getById
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
