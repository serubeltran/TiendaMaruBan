import React, { useState, useEffect, useContext } from 'react'
import productosData from '../api/productos'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../context/CartContext'

export default function Home(){
  const [productos, setProductos] = useState([])
  const { addToCart } = useContext(CartContext)
  const [msg, setMsg] = useState(null)

  useEffect(()=>{
    setProductos(productosData)
  },[])

  const handleAdd = (p)=>{
    addToCart(p,1)
    setMsg('Producto añadido al carrito')
    setTimeout(()=>setMsg(null), 700)
  }

  return (
    <main className="container">
      <h2 style={{marginBottom:12}}>Productos</h2>
      {msg && <div style={{marginBottom:12,color:'#065f46',background:'#ecfdf5',padding:10,borderRadius:8}}>{msg}</div>}
      <section className="grid">
        {productos.map(p=> <ProductCard key={p.id} producto={p} onAdd={handleAdd} />)}
      </section>
    </main>
  )
}
