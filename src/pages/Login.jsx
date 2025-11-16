import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export default function Login(){
  const [email, setEmail] = useState('susana@test1.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e)=>{
    e.preventDefault()
    const res = login({email,password})
    if(res.ok){
      navigate(from, {replace:true})
    }else{
      setError(res.message || 'Error al iniciar sesión.')
      setTimeout(()=>setError(null),2500)
    }
  }

  return (
    <main className="container">
      <h2>Iniciar sesión</h2>
      <form className="form" onSubmit={handleSubmit}>
        {error && <div style={{marginBottom:8,color:'#b91c1c',background:'#fff1f2',padding:8,borderRadius:6}}>{error}</div>}
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button className="btn" type="submit">Entrar</button>
        </div>
        <p style={{marginTop:10,color:'#6b7280'}}>
          Credenciales de demo:
          <br/>Usuario normal: <strong>susana@test1.com</strong> / <strong>123456</strong>
          <br/>Administrador: <strong>admin@mail.com</strong> / <strong>admin</strong>
        </p>
      </form>
    </main>
  )
}
