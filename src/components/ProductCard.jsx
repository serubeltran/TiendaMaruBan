import { Link } from 'react-router-dom'

export default function ProductCard({producto, onAdd}){
  return (
    <article className="card">
      <img src={producto.imagen} alt={producto.titulo} />
      <h3 style={{fontSize:16}}>{producto.titulo}</h3>
      {/*<p style={{color:'#6b7280',fontSize:14}}>{producto.descripcion}</p>*/}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
        {/*<strong>${producto.precio.toFixed(2)}</strong>*/}
        <strong>${producto.precio}</strong>
        <div style={{display:'flex',gap:8}}>
          <Link to={`/producto/${producto.id}`} className="btn secondary">Ver</Link>
          <button className="btn" onClick={()=>onAdd(producto)}>Añadir</button>
        </div>
      </div>
    </article>
  )
}
