import React, { createContext, useState, useEffect, useCallback, useContext } from 'react'

const API_URL = "https://68f28b54b36f9750deecfadc.mockapi.io/api/maru/artesanias"

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    ;(async ()=>{
      try{
        const res = await fetch(API_URL)
        const data = await res.json()
        if(!mounted) return
        const mapped = data.map(item => ({ id: item.id, titulo: item.producto, precio: item.precio, imagen: item.imagen, descripcion: item.descripcion }))
        setProducts(mapped)
      }catch(err){
        if(!mounted) return
        console.error('Error cargando productos:', err)
        setError(err)
      } finally{
        if(!mounted) return
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const addProduct = useCallback(async (p)=>{
    try{
      const payload = { producto: p.titulo, precio: p.precio, imagen: p.imagen, descripcion: p.descripcion }
      const res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      if(!res.ok) throw new Error(`API error ${res.status}`)
      const item = await res.json()
      const np = { id: item.id, titulo: item.producto, precio: item.precio, imagen: item.imagen, descripcion: item.descripcion }
      setProducts(prev => [np, ...prev])
      return { ok:true, data: np }
    }catch(err){
      console.error('addProduct error', err)
      return { ok:false, error: err }
    }
  }, [])

  const updateProduct = useCallback(async (id, patch) => {
    try{
      const payload = { producto: patch.titulo, precio: patch.precio, imagen: patch.imagen, descripcion: patch.descripcion }
      const res = await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      if(!res.ok) throw new Error(`API error ${res.status}`)
      const item = await res.json()
      const updated = { id: item.id, titulo: item.producto, precio: item.precio, imagen: item.imagen, descripcion: item.descripcion }
      setProducts(prev => prev.map(x => x.id === id ? updated : x))
      return { ok:true, data: updated }
    }catch(err){
      console.error('updateProduct error', err)
      return { ok:false, error: err }
    }
  }, [])

  const deleteProduct = useCallback(async (id) => {
    try{
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if(!res.ok) throw new Error(`API error ${res.status}`)
      setProducts(prev => prev.filter(x => x.id !== id))
      return { ok:true }
    }catch(err){
      console.error('deleteProduct error', err)
      return { ok:false, error: err }
    }
  }, [])

  const getById = useCallback((id) => products.find(p => String(p.id) === String(id)), [products])

  return (
    <ProductsContext.Provider value={{ products, loading, error, addProduct, updateProduct, deleteProduct, getById }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
