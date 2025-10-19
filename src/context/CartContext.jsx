import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('ecom_cart')) || [] }catch{return []}
  })

  useEffect(()=>{
    localStorage.setItem('ecom_cart', JSON.stringify(items))
  },[items])

  const addToCart = (producto, qty=1) => {
    setItems(prev=>{
      const found = prev.find(p=>p.id===producto.id)
      if(found){
        return prev.map(p=> p.id===producto.id ? {...p, qty: p.qty+qty} : p)
      }
      return [...prev, {...producto, qty}]
    })
  }
  const removeFromCart = (id) => setItems(prev => prev.filter(p=>p.id!==id))
  const clearCart = ()=> setItems([])
  const total = items.reduce((s,p)=> s + p.precio * p.qty, 0)

  return <CartContext.Provider value={{items, addToCart, removeFromCart, clearCart, total}}>{children}</CartContext.Provider>
}
