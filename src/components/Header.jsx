// Header con navegación, login y carrito

import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext.jsx'
import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'

export default function Header({ onCartClick, onLoginClick }) {
  const { cart } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const count = Array.isArray(cart)
    ? cart.reduce((s, item) => s + (item.qty || 1), 0)
    : 0

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Navbar
      bg="white"
      expand="md"
      className="mb-3 shadow-sm rounded"
      sticky="top"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">Tienda MaruBan</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            {user && user.role === 'admin' && (
              <Nav.Link as={NavLink} to="/stock">Stock</Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-2">

            {/* Usuario logueado */}
            {user ? (
              <>
                <span className="text-muted">Hola, {user.name}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={onLoginClick}
              >
                Iniciar sesión
              </Button>
            )}

            {/* Botón del carrito */}
            <Button
              variant="primary"
              size="sm"
              onClick={onCartClick}
              className="d-flex align-items-center gap-2"
              aria-label="Abrir carrito"
            >
              <FaShoppingCart />
              <Badge bg="light" text="primary" pill>
                {count}
              </Badge>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
