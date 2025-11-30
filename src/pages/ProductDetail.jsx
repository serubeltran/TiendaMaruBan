import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { getById, loading, error } = useProducts();
  const producto = getById(id);

  const [zoomOpen, setZoomOpen] = useState(false);

  const handleZoomToggle = () => {
    setZoomOpen(!zoomOpen);
  };

  useEffect(() => {
    if (zoomOpen) {
      document.body.style.overflow = "hidden";  
    } else {
      document.body.style.overflow = "auto";
    }
  }, [zoomOpen]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <main className="container py-4">
      <div className="mb-3 text-end">
        <Link to="/" className="btn btn-secondary">Volver</Link>
      </div>

      <h2>{producto.TITULO || producto.titulo}</h2>

      {/* Imagen normal (chica, zoom-in) */}
      <img
        src={producto.imagen}
        alt={producto.TITULO || producto.titulo}
        className="img-detail"
        onClick={handleZoomToggle}
      />

      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p>{producto.descripcion}</p>

      {/* Overlay oscuro con zoom */}
      <div
        className={`image-overlay ${zoomOpen ? "visible" : ""}`}
        onClick={handleZoomToggle}
      >
        <img src={producto.imagen} alt="Zoom" />
      </div>
    </main>
  );
}
