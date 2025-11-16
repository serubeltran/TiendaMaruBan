import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export default function AdminRoute({ children }){
  const { user } = useContext(AuthContext)
  if(!user) return <Navigate to="/login" replace />
  if(user.role !== 'admin') return <Navigate to="/" replace />
  return children
}
