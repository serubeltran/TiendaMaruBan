import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

export default function Cart(){
  const { items, removeFromCart, clearCart, total } = useContext(CartContext)
  const [msg, setMsg] = useState(null)

  const handleRemove = (id)=>{
    removeFromCart(id)
    setMsg('Producto eliminado')
    setTimeout(()=>setMsg(null),1000)
  }
  const handleCheckout = ()=>{
    setMsg('Compra simulada realizada. Gracias!')
    clearCart()
    setTimeout(()=>setMsg(null),1500)
  }

  return (
    <main className="container">
      <h2>Carrito</h2>
      {msg && <div style={{marginBottom:12,color:'#0c4a6e',background:'#eff6ff',padding:10,borderRadius:8}}>{msg}</div>}
      {items.length===0 ? <p>Tu carrito está vacío.</p> : (
        <div style={{display:'grid',gap:12}}>
          {items.map(i=> (
            <div key={i.id} className="card" style={{display:'flex',gap:12,alignItems:'center'}}>
              <img src={i.imagen} alt={i.titulo} style={{width:100,height:80,objectFit:'cover',borderRadius:6}} />
              <div style={{flex:1}}>
                <h4 style={{marginBottom:4}}>{i.title}</h4>
                <div style={{color:'#6b7280'}}>Cantidad: {i.qty}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontWeight:700}}>${(i.precio*i.qty).toFixed(2)}</div>
                <div style={{marginTop:8,display:'flex',gap:8,justifyContent:'flex-end'}}>
                  <button className="btn secondary" onClick={()=>handleRemove(i.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <strong>Total: ${total.toFixed(2)}</strong>
            <div>
              <button className="btn secondary" onClick={clearCart}>Vaciar</button>
              <button className="btn" style={{marginLeft:8}} onClick={handleCheckout}>Comprar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
