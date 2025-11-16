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

  // Default style (desktop): align to top-right of the container where this component is placed
  const defaultStyle = { position: 'absolute', right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 1060 }

  // On small screens, center the toasts below the header and use fixed positioning so they are visible regardless of scroll
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
          <Toast.Body style={{ fontSize: 13, padding: '6px 10px', display: 'inline-block' }}>{t.message}</Toast.Body>
        </Toast>
      ))}
    </div>
  )
}
