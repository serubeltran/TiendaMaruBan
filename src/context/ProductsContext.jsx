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

  const addProduct = async (data) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          producto: data.titulo,
          precio: data.precio,
          imagen: data.imagen,
          descripcion: data.descripcion
        })
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const newProduct = await response.json();
      const transformedProduct = {
        id: newProduct.id,
        titulo: newProduct.producto,
        precio: Number(newProduct.precio),
        imagen: newProduct.imagen,
        descripcion: newProduct.descripcion
      };
      setProducts(prev => [...prev, transformedProduct]);
      return { ok: true };
    } catch (err) {
      console.error('Error al agregar producto:', err);
      return { ok: false, error: err.message };
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          producto: data.titulo,
          precio: data.precio,
          imagen: data.imagen,
          descripcion: data.descripcion
        })
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const updatedProduct = await response.json();
      const transformedProduct = {
        id: updatedProduct.id,
        titulo: updatedProduct.producto,
        precio: Number(updatedProduct.precio),
        imagen: updatedProduct.imagen,
        descripcion: updatedProduct.descripcion
      };
      setProducts(prev => prev.map(p => p.id === id ? transformedProduct : p));
      return { ok: true };
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      return { ok: false, error: err.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      setProducts(prev => prev.filter(p => p.id !== id));
      return { ok: true };
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      return { ok: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        getById,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
