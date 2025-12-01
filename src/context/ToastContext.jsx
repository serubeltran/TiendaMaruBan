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
      bg: options.bg || 'primary'
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

export default ToastProvider
