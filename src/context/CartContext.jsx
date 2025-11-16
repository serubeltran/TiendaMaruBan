import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  // No inicializar desde localStorage: el carrito debe empezar vacío en cada carga
    const [items, setItems] = useState(() => {
      try { return JSON.parse(sessionStorage.getItem('ecom_cart')) || [] } catch { return [] }
    })

  // Asegurar que cualquier carrito previo en localStorage se elimine al montar
  useEffect(() => {
    try { localStorage.removeItem('ecom_cart') } catch (e) {}
  }, [])
  
    useEffect(() => {
      try { sessionStorage.setItem('ecom_cart', JSON.stringify(items)) } catch (e) {}
    }, [items])

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

  // Nuevas funciones para manejar cantidades
  const increaseQuantity = (id) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p))
  }

  const decreaseQuantity = (id) => {
    setItems(prev => {
      const found = prev.find(p => p.id === id)
      if (found && found.qty > 1) {
        return prev.map(p => p.id === id ? { ...p, qty: p.qty - 1 } : p)
      } else {
        return prev.filter(p => p.id !== id)
      }
    })
  }

  return <CartContext.Provider value={{items, addToCart, removeFromCart, clearCart, total, increaseQuantity, decreaseQuantity}}>{children}</CartContext.Provider>
}