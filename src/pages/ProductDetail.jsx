// Muestra el detalle de un producto seleccionado

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { formatPrecioAR } from '../utils/formatPrecioAR';

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
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <h2 className="mb-0 text-primary">{producto.TITULO || producto.titulo}</h2>
        <Link to="/" className="btn btn-outline-primary shadow-sm ms-3">Volver</Link>
      </div>

      {/* Imagen normal (chica, zoom-in) */}
      <img
        src={producto.imagen}
        alt={producto.TITULO || producto.titulo}
        className="img-detail shadow-sm"
        style={{ cursor: "zoom-in" }}
        onClick={handleZoomToggle}
        tabIndex={0}
        role="button"
        aria-label="Ampliar imagen"
      />

      <p className="h4 text-primary mb-2"><strong>Precio:</strong> {formatPrecioAR(producto.precio)}</p>
      <p className="mb-4 text-muted">{producto.descripcion}</p>

      {/* Overlay oscuro con zoom */}
      <div
        className={`image-overlay ${zoomOpen ? "visible" : ""}`}
        onClick={handleZoomToggle}
        style={{ transition: "opacity 0.25s ease" }}
      >
        <img src={producto.imagen} alt="Zoom" />
        {zoomOpen && (
          <button
            type="button"
            className="btn btn-light position-absolute top-0 end-0 m-3"
            style={{ zIndex: 10001 }}
            onClick={handleZoomToggle}
            aria-label="Cerrar zoom"
          >
            &times;
          </button>
        )}
      </div>
    </main>
  );
}
