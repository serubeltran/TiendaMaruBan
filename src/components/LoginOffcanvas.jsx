// src/components/LoginOffcanvas.jsx
import React, { useState, useEffect, useContext } from "react";
import { Offcanvas, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function LoginOffcanvas({ show, onClose, onLoginSuccess }) {
  const { login, user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  // 🔹 Resetear formulario cuando se cierra Login
  useEffect(() => {
    if (!show) {
      setEmail("");
      setPassword("");
      setLocalError("");
      setLoading(false);
    }
  }, [show]);

  // 🔹 Cuando usuario inicia sesión → cerrar + notificar éxito
  useEffect(() => {
    if (user) {
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      }
      onClose();
    }
  }, [user, onClose, onLoginSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError("");

    try {
      const ok = await login(email, password);
      setLoading(false);

      if (!ok) {
        setLocalError("Credenciales incorrectas");
      }
      // Si ok === true, el useEffect se encargará del cierre y notificación
    } catch (err) {
      setLoading(false);
      setLocalError("Error al iniciar sesión");
      console.error(err);
    }
  };

  return (
    <Offcanvas show={show} onHide={() => !loading && onClose()} placement="end">
      <Offcanvas.Header closeButton={!loading}>
        <Offcanvas.Title>Iniciar sesión</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <p style={{ marginBottom: 12, color: "#444" }}>
          Ingresá con tu cuenta para continuar.
        </p>

        {localError && (
          <div
            style={{
              marginBottom: 12,
              color: "#b91c1c",
              background: "#ffe5e5",
              padding: 10,
              borderRadius: 6,
              textAlign: "center",
            }}
          >
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            style={{ marginBottom: 10 }}
            required
            disabled={loading}
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            style={{ marginBottom: 12 }}
            required
            disabled={loading}
          />

          <div style={{ display: "flex", gap: 8 }}>
            <Button
              variant="secondary"
              onClick={onClose}
              style={{ flex: 1 }}
              disabled={loading}
            >
              Cerrar
            </Button>

            <Button
              variant="primary"
              type="submit"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Entrar"}
            </Button>
          </div>
        </form>

        <p style={{ marginTop: 18, color: "#6b7280", fontSize: "14px" }}>
          Credenciales de prueba:
          <br /> <strong>susana@test1.com</strong> / <strong>123456</strong>
          <br /> <strong>admin@mail.com</strong> / <strong>admin</strong>
        </p>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
