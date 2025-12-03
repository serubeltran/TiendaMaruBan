// Control de stock (CRUD de productos)

import React, { useState } from 'react'
import { useProducts } from '../context/ProductsContext'
import { ToastContext } from '../context/ToastContext'
import { useContext } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { formatPrecioAR } from '../utils/formatPrecioAR';

function ProductForm({ initial, onSave, onCancel }){
  const [titulo, setTitulo] = useState(initial?.titulo || '')
  const [precio, setPrecio] = useState(initial?.precio || '')
  const [imagen, setImagen] = useState(initial?.imagen || '')
  const [descripcion, setDescripcion] = useState(initial?.descripcion || '')
  const [errors, setErrors] = useState({})

  const validate = (field = null) => {
    const e = { ...errors }
    
    if(!field || field === 'titulo') {
      if(!titulo.trim()) e.titulo = 'El título es requerido'
      else if(titulo.trim().length < 3) e.titulo = 'El título debe tener al menos 3 caracteres'
      else delete e.titulo
    }
    
    if(!field || field === 'precio') {
      const p = parseFloat(precio)
      if(Number.isNaN(p) || !isFinite(p) || p <= 0) e.precio = 'El precio debe ser un número mayor que cero'
      else delete e.precio
    }
    
    if(!field || field === 'descripcion') {
      if(!descripcion || descripcion.length < 20 || descripcion.length > 150) e.descripcion = 'La descripción debe tener entre 20 y 150 caracteres'
      else delete e.descripcion
    }
    
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!validate()) return
    onSave({ titulo: titulo.trim(), precio: Number(precio), imagen: imagen.trim(), descripcion: descripcion.trim() })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Título</Form.Label>
        <Form.Control 
          value={titulo} 
          onChange={e=>setTitulo(e.target.value)} 
          onBlur={() => validate('titulo')}
        />
        {errors.titulo && <div className="text-danger small">{errors.titulo}</div>}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Precio</Form.Label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <Form.Control 
            type="number" 
            step="0.01" 
            min="0" 
            value={precio} 
            onChange={e=>setPrecio(e.target.value)} 
            onBlur={() => validate('precio')}
          />
        </div>
        {errors.precio && <div className="text-danger small">{errors.precio}</div>}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Imagen (URL)</Form.Label>
        <Form.Control value={imagen} onChange={e=>setImagen(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Descripción</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={descripcion} 
          onChange={e=>setDescripcion(e.target.value)} 
          onBlur={() => validate('descripcion')}
        />
        {errors.descripcion && <div className="text-danger small">{errors.descripcion}</div>}
      </Form.Group>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary">Guardar</Button>
      </div>
    </Form>
  )
}

export default function Stock(){
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts()
  const { showToast } = useContext(ToastContext)

  // search + pagination
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState({ show:false, id:null, titulo:'' })

  const openAdd = ()=>{ setEditing(null); setShowModal(true) }
  const openEdit = (p)=>{ setEditing(p); setShowModal(true) }

  const handleSave = async (data)=>{
    if(editing){
      const res = await updateProduct(editing.id, data)
      if(res.ok){
        showToast('Producto modificado correctamente', { delay: 2000, bg: 'success' })
      } else {
        showToast('Error al modificar el producto', { delay: 3000, bg: 'danger' })
      }
    } else {
      const res = await addProduct(data)
      if(res.ok){
        showToast('Producto agregado correctamente', { delay: 2000, bg: 'success' })
      } else {
        showToast('Error al agregar el producto', { delay: 3000, bg: 'danger' })
      }
    }
    setShowModal(false)
  }

  const askDelete = (p)=> setConfirmDelete({ show:true, id: p.id, titulo: p.titulo })
  const cancelDelete = ()=> setConfirmDelete({ show:false, id:null, titulo:'' })
  const confirmDeleteAction = async ()=>{
    const res = await deleteProduct(confirmDelete.id)
    if(res.ok){
      showToast('Producto eliminado correctamente', { delay: 2000, bg: 'success' })
    } else {
      showToast('Error al eliminar el producto', { delay: 3000, bg: 'danger' })
    }
    cancelDelete()
  }

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Stock (CRUD de productos)</h2>
        <div>
          <button className="btn btn-primary" onClick={openAdd}>Agregar producto</button>
        </div>
      </div>

      <div className="mb-3 d-flex gap-2 align-items-center">
        <input className="form-control me-2" placeholder="Buscar por título..." value={query} onChange={e=>{ setQuery(e.target.value); setPage(1) }} style={{maxWidth:360}} />
        <div className="ms-auto d-flex align-items-center gap-2">
          <label className="small text-muted mb-0">Por página</label>
          <select className="form-select form-select-sm" style={{width:80}} value={pageSize} onChange={e=>{ setPageSize(Number(e.target.value)); setPage(1) }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : (
        <div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const filtered = products.filter(p => p.titulo.toLowerCase().includes(query.toLowerCase()))
                  const total = filtered.length
                  const totalPages = Math.max(1, Math.ceil(total / pageSize))
                  const current = Math.min(page, totalPages)
                  const start = (current - 1) * pageSize
                  const slice = filtered.slice(start, start + pageSize)
                  return (
                    <>
                      {slice.map(p => (
                        <tr key={p.id}>
                          <td style={{width:90}}><img src={p.imagen} alt={p.titulo} className="img-fluid" style={{width:100, height:100, objectFit:'cover', borderRadius:4}} /></td>
                          <td>
                            <div><strong>{p.titulo}</strong></div>
                            <div style={{fontSize:'0.85em', color:'#666', marginTop:4}}>{p.descripcion}</div>
                          </td>
                          <td>{formatPrecioAR(p.precio)}</td>
                          <td>
                            <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
                              <button className="btn btn-outline-primary" style={{fontSize:'12px', padding:'6px 12px'}} onClick={() => openEdit(p)}>Editar</button>
                              <button className="btn btn-danger" style={{fontSize:'12px', padding:'6px 12px'}} onClick={() => askDelete(p)}>Eliminar</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {slice.length === 0 && (
                        <tr><td colSpan={4} className="text-center text-muted">No se encontraron productos</td></tr>
                      )}
                    </>
                  )
                })()}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {products.length > 0 && (
            (() => {
              const filtered = products.filter(p => p.titulo.toLowerCase().includes(query.toLowerCase()))
              const total = filtered.length
              const totalPages = Math.max(1, Math.ceil(total / pageSize))
              return (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="small text-muted">Mostrando página {Math.min(page, totalPages)} de {totalPages} — {total} productos</div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-2" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Anterior</button>
                    <button className="btn btn-sm btn-outline-secondary" disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Siguiente</button>
                  </div>
                </div>
              )
            })()
          )}
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar producto' : 'Agregar producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm initial={editing} onSave={handleSave} onCancel={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>

      <Modal show={confirmDelete.show} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar "{confirmDelete.titulo}"? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDeleteAction}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </main>
  )
}
