import React, { createContext, useState, useCallback } from 'react'

export const ToastContext = createContext()

let idCounter = 0

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, options = {}) => {
    const id = ++idCounter
    const toast = {
      id,
      message,
      autohide: options.autohide ?? true,
      delay: options.delay ?? 2000,
      bg: options.bg || null
    }
    setToasts((t) => [toast, ...t])
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter(x => x.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

// Nota: la presentación (ToastContainer / posición) se hace en el componente
// donde se quiera mostrar (por ejemplo en `Home.jsx`) para controlar exacto
// lugar y estilo y evitar problemas con reload/hmr.

export default ToastProvider
