import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext.jsx'
import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap'

export default function Header({ onCartClick }) {
  const { items, clearCart } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)
  const count = items.reduce((s, i) => s + i.qty, 0)
  const navigate = useNavigate()

  
  return (
    <Navbar bg="white" expand="md" className="mb-3 shadow-sm rounded" sticky="top">
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
            {user ? (
              <>
                <span className="text-muted">Hola, {user.name}</span>
                <Button variant="outline-secondary" size="sm" onClick={handleLogout}>Cerrar sesión</Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="outline-secondary" size="sm">Iniciar sesión</Button>
            )}
            <Button variant="primary" size="sm" onClick={onCartClick} className="ms-2">
              Carrito <Badge bg="light" text="dark" className="ms-2">{count}</Badge>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}