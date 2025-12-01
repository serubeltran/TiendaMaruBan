import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function ProductCard({producto, onAdd, isInCart}) {
  const navigate = useNavigate()
  const [showAdded, setShowAdded] = useState(false)
  const timeoutRef = useRef(null)

  const handleAddClick = () => {
    onAdd(producto)
    setShowAdded(true)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setShowAdded(false)
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <article className="card h-100 d-flex flex-column product-card">
      <div 
        className="position-relative"
        onClick={() => navigate(`/producto/${producto.id}`)}
        style={{cursor:'pointer'}}
      >
        <img 
          src={producto.imagen} 
          alt={producto.titulo} 
          className="card-img-top img-fluid img-uniform" 
        />
      </div>

      <div className="p-2 p-sm-3 d-flex flex-column" style={{flex:1}}>
        <h5 className="card-title" style={{fontSize:16, marginBottom:6}}>
          {producto.titulo}
        </h5>

        <div className="d-flex align-items-center justify-content-between gap-2 mt-auto flex-wrap">
          <span className="fw-bold text-success">
            ${producto.precio}
          </span>

          <button
            className={`btn btn-sm flex-shrink-0 ${
              showAdded ? 'btn-success' : 'btn-primary'
            }`}
            onClick={handleAddClick}
            disabled={showAdded}
            style={{
              minWidth: '100px',
              transition: 'all 0.3s ease'
            }}
          >
            {showAdded ? '✓ Agregado' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  )
}
