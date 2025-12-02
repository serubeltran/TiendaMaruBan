// Manejo de errores y mensajes al respecto

import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error){
    return { hasError: true, error }
  }

  componentDidCatch(error, info){
    // Muestra mensaje por la consola
    console.error('Error capturado por ErrorBoundary:', error, info)
  }

  render(){
    if(this.state.hasError){
      return (
        <main className="container py-5">
          <div className="alert alert-danger">
            <h5>Ha ocurrido un error en la aplicación</h5>
            <p className="mb-2">Puedes volver a la página principal (recarga completa) o recargar la aplicación.</p>
            <div className="d-flex gap-2">
              {/* Usar navegación completa en caso de error para reiniciar el estado de la app */}
              <button className="btn btn-outline-secondary" onClick={() => { window.location.href = '/' }}>Ir al inicio</button>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>Recargar</button>
            </div>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
