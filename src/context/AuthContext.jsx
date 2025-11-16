import React, { createContext, useState, useEffect, useContext } from 'react'
import usuarios from '../api/usuarios'
import { CartContext } from './CartContext.jsx'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { clearCart } = useContext(CartContext)

  // Persistir sesión sólo durante la sesión del navegador usando sessionStorage
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('ecom_user')) || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) sessionStorage.setItem('ecom_user', JSON.stringify(user))
    else sessionStorage.removeItem('ecom_user')
  }, [user])

  const login = ({email, password}) => {
    const found = usuarios.find(u => u.email === email && u.password === password)
    if(found){
      // incluir role si está disponible
      const userObj = { id: found.id, email: found.email, name: found.name }
      if(found.role) userObj.role = found.role
      setUser(userObj)
      return { ok:true }
    }
    return { ok:false, message: 'Usuario no registrado' }
  }
  const logout = ()=> {
    setUser(null)
    // Limpiar el carrito al cerrar sesión
    try { 
      sessionStorage.removeItem('ecom_user')
      sessionStorage.removeItem('ecom_cart')
      clearCart()  // ¡Resetea items en memoria!!!!!!!
    } catch (e) {}
  }

  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
