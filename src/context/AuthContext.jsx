import React, { createContext, useState, useEffect } from 'react' // Quita useContext
import usuarios from '../api/usuarios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Quita: const { clearCart } = useContext(CartContext)

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
      const userObj = { id: found.id, email: found.email, name: found.name }
      if(found.role) userObj.role = found.role
      setUser(userObj)
      return { ok:true }
    }
    return { ok:false, message: 'Usuario no registrado' }
  }

  const logout = () => {
    setUser(null)
    try { 
      sessionStorage.removeItem('ecom_user')
      sessionStorage.removeItem('ecom_cart')
    } catch (e) {}
  }

  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}