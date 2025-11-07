import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./App.css";

function ErrorEntrar() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="page-wrapper">
      <Header />

      <div className="login-container">
        <h2>Error 404</h2>
        <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#555" }}>
          La página que estás buscando no existe o ha sido movida.
        </p>

        <div className="form-actions" style={{ justifyContent: "center" }}>
          <button onClick={handleGoHome}>Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorEntrar;
