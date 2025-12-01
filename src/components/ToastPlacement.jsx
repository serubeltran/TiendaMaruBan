import React, { useContext, useEffect, useState } from 'react'
import { Toast } from 'react-bootstrap'
import { ToastContext } from '../context/ToastContext'

export default function ToastPlacement({ wrapperStyle }){
  const { toasts, removeToast } = useContext(ToastContext)
  const [isSmall, setIsSmall] = useState(false)
  const [topOffset, setTopOffset] = useState(12)

  useEffect(() => {
    const compute = () => {
      const small = window.innerWidth <= 600
      setIsSmall(small)
      if (small) {
        const header = document.querySelector('.header')
        const h = header ? header.getBoundingClientRect().height : 56
        setTopOffset(h + 12)
      }
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  // Estilo pantalla PC - Centrado
  const defaultStyle = { position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: 8, zIndex: 1060, alignItems: 'center' }

  // Estilo pantallas chicas
  const smallStyle = {
    position: 'fixed',
    top: `${topOffset}px`,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    zIndex: 1060,
    width: 'calc(100% - 32px)',
    alignItems: 'center'
  }

  const style = Object.assign({}, isSmall ? smallStyle : defaultStyle, wrapperStyle || {})

  return (
    <div style={style} aria-live="polite" aria-atomic="true">
      {toasts.map(t => (
        <Toast
          key={t.id}
          bg={t.bg}
          onClose={() => removeToast(t.id)}
          autohide={t.autohide}
          delay={t.delay}
          style={{ display: 'inline-block', width: 'auto', maxWidth: 420 }}
        >
          <Toast.Body style={{ fontSize: 13, padding: '6px 10px', display: 'inline-block', color: 'white' }}>{t.message}</Toast.Body>
        </Toast>
      ))}
    </div>
  )
}
