// Controla el login y el acceso a la ruta protegida (Control de stock)

import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export default function AdminRoute({ children }){
  const { user } = useContext(AuthContext)
  if(!user) return <Navigate to="/login" replace />
  if(user.role !== 'admin') return <Navigate to="/" replace />
  return children
}
