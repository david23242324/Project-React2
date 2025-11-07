import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });

      if (res.status === 200 && res.data.usuario) {
        navigate("/usuarios");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Credenciales incorrectas (401)");
      } else if (err.response?.status === 404) {
        setError("Usuario no encontrado (404)");
      } else if (err.response?.status === 500) {
        setError("Error del servidor (500)");
      } else {
        setError("Error al conectar con el servidor");
      }
      console.error(err);
    }
  };

  return (
    <div className="page-wrapper">
      <Header />

      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger text-center mt-2">{error}</div>
          )}

          <div className="form-actions">
            <button type="submit">Entrar</button>
            <a href="#">¿No tienes cuenta?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;