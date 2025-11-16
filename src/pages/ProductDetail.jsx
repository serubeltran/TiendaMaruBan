import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import { CartContext } from '../context/CartContext'
import { ToastContext } from '../context/ToastContext'
// ToastPlacement se renderiza globalmente en App.jsx
import { Modal } from 'react-bootstrap'

export default function ProductDetail(){
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const { products, loading } = useProducts()
  const [showImgModal, setShowImgModal] = useState(false)
  const { addToCart } = useContext(CartContext)
  const { showToast } = useContext(ToastContext)

  useEffect(()=>{
    // Comparar como strings para evitar problemas si id viene como número o string
    const found = products.find(p=> String(p.id) === String(id))
    setProducto(found)
    // If products are loaded async, the provider's loading flag handles it
  },[id])

  // Eliminado log de depuración en producción

  if(loading) return (
    <main className="container py-4">
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div>
        <div className="mt-3">Cargando producto...</div>
      </div>
    </main>
  )

  if(!producto) return <main className="container py-4"><p>Producto no encontrado</p></main>

  const add = ()=>{
    addToCart(producto,1)
    showToast('Producto añadido al carrito.', { delay: 1200 })
  }

  const openImg = () => setShowImgModal(true)
  const closeImg = () => setShowImgModal(false)

  return (
    <main className="container">
      <div style={{ position: 'relative', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0 }}>Detalles del producto</h2>
          <small className="text-muted">Pulsa la imagen para ampliarla</small>
        </div>
        <div>
          <Link to="/" className="btn btn-outline-secondary btn-sm">Volver</Link>
        </div>
  {/* Toasts renderizados globalmente en App.jsx */}
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-5">
          <img src={producto.imagen || ''} alt={producto.titulo || 'producto'} className="img-fluid img-detail rounded img-clickable" onClick={openImg} />
          <Modal show={showImgModal} onHide={closeImg} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{producto.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img src={producto.imagen || ''} alt={producto.titulo || 'producto'} className="img-fluid" style={{maxHeight: '80vh', objectFit: 'contain'}} />
            </Modal.Body>
          </Modal>
        </div>
        <div className="col-12 col-md-7">
          <h3 style={{marginTop:0}}>{producto.titulo || 'Sin título'}</h3>
          <p style={{color:'#6b7280'}}>{producto.descripcion || 'Sin descripción disponible'}</p>
          <p style={{fontSize:20,fontWeight:700}}>${(Number(producto.precio) || 0).toFixed(2)}</p>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <button className="btn" onClick={add}>Añadir al carrito</button>
          </div>
        </div>
      </div>
    </main>
  )
}
