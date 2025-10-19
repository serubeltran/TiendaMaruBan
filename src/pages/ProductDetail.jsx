import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import productosData from '../api/productos'
import { CartContext } from '../context/CartContext'

export default function ProductDetail(){
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const { addToCart } = useContext(CartContext)
  const [msg, setMsg] = useState(null)

  useEffect(()=>{
    const found = productosData.find(p=>p.id===id)
    setProducto(found)
  },[id])

  if(!producto) return <div className="container"><p>Producto no encontrado</p></div>

  const add = ()=>{
    addToCart(producto,1)
    setMsg('Producto añadido al carrito.')
    setTimeout(()=>setMsg(null),1000)
  }

  return (
    <main className="container">
      {msg && <div style={{marginBottom:12,color:'#065f46',background:'#ecfdf5',padding:10,borderRadius:8}}>{msg}</div>}
      <div style={{display:'flex',gap:20,alignItems:'flex-start',flexWrap:'wrap'}}>
        <img src={producto.imagen} alt={producto.titulo} style={{width:360,height:280,objectFit:'cover',borderRadius:8}} />
        <div style={{maxWidth:520}}>
          <h2>{producto.titulo}</h2>
          <p style={{color:'#6b7280'}}>{producto.descripcion}</p>
          <p style={{fontSize:20,fontWeight:700}}>${producto.precio.toFixed(2)}</p>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <button className="btn" onClick={add}>Añadir al carrito</button>
          </div>
        </div>
      </div>
    </main>
  )
}
