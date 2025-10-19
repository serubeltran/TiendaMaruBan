import React, { createContext, useState, useEffect } from 'react'
import usuarios from '../api/usuarios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try{
      return JSON.parse(localStorage.getItem('ecom_user')) || null
    }catch{ return null }
  })
  useEffect(()=>{
    if(user) localStorage.setItem('ecom_user', JSON.stringify(user))
    else localStorage.removeItem('ecom_user')
  },[user])

  const login = ({email, password}) => {
    const found = usuarios.find(u => u.email === email && u.password === password)
    if(found){
      setUser({id: found.id, email: found.email, name: found.name})
      return { ok:true }
    }
    return { ok:false, message: 'Usuario no registrado' }
  }
  const logout = ()=> setUser(null)

  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}
