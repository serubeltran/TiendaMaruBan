import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

export default function Header(){
  const { items } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)
  const count = items.reduce((s,i)=>s+i.qty, 0)
  return (
    <header className="header">
      <div className="tienda"><Link to="/">Tienda MaruBan</Link></div>
      <nav className="nav">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/cart">Carrito</NavLink>
        <NavLink to="/nosotros">Nosotros</NavLink>
      </nav>
      
      <div className="header-right">
        {user ? (
          <>
            <span style={{color:'#374151'}}>Hola, {user.name}</span>
            <button className="btn secondary" onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <Link className="btn secondary" to="/login">Iniciar sesión</Link>
        )}
        <Link to="/cart" className="btn" title="Ver carrito">Carrito <span className="cart-count" style={{marginLeft:8}}>{count}</span></Link>
      </div>
    </header>
  )
}
