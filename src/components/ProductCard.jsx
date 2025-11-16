import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function ProductCard({producto, onAdd, isInCart}){
  const navigate = useNavigate()
  const [showAdded, setShowAdded] = useState(false)
  const timeoutRef = useRef(null)

  const handleAddClick = () => {
    onAdd(producto)
    setShowAdded(true)
    
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Mostrar "Agregado" durante 1 segundo
    timeoutRef.current = setTimeout(() => {
      setShowAdded(false)
    }, 1000)
  }

  // Limpiar timeout al desmontar
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
        onClick={() => navigate(`/product/${producto.id}`)}
        style={{ cursor: 'pointer', overflow: 'hidden' }}
        className="position-relative"
      >
        <img 
          src={producto.imagen} 
          alt={producto.titulo} 
          className="card-img-top img-fluid img-uniform" 
          style={{ transition: 'transform 0.3s ease' }}
        />
      </div>
      <div className="p-3 d-flex flex-column" style={{flex:1}}>
        <h5 className="card-title" style={{fontSize:16, marginBottom:6}}>{producto.titulo}</h5>
        {/* En la lista principal no mostramos la descripción para mantener altura consistente */}

        <div className="d-flex align-items-center justify-content-between mt-auto">
          <strong>${parseFloat(producto.precio).toFixed(2)}</strong>
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
