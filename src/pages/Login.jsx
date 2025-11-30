import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import usuarios from "../api/usuarios";

export default function Login({ onSuccess }) {
  const { login, redirectAfterLogin, setRedirectAfterLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    login({
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    });

    setError("");

    if (redirectAfterLogin === "cart") {
      setRedirectAfterLogin(null);
      onSuccess("cart");
      return;
    }

    onSuccess();
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        padding: 25,
        borderRadius: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        background: "white",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: 20 }}>Iniciar sesión</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p style={{ color: "red", marginTop: -10, marginBottom: 10 }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Entrar
        </button>
      </form>

      <div style={{ marginTop: 20, fontSize: 14, textAlign: "center" }}>
        <strong>Credenciales de prueba:</strong>
        <br /> admin@mail.com / admin <br /> susana@test1.com / 123456
      </div>
    </div>
  );
}
