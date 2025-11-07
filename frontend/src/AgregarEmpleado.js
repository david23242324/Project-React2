import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarEmpleado() {
  const navegacion = useNavigate();

  const [empleado, setEmpleado] = React.useState({
    nombre: '',
    email: '',
    password: '',
    telefono: ''
  });

  const unInputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  const urlBase = "http://localhost:5001/api/";

  try {
    const response = await fetch(`${urlBase}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(empleado)
    });

    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }

    // Si todo sale bien, redirige
    navegacion("/usuarios");
  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo crear el usuario");
  }
};


  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="nombre"
        value={empleado.nombre}
        onChange={unInputChange}
        className="form-control"
        placeholder="Nombre"
      />
      <input
        type="email"
        name="email"
        value={empleado.email}
        onChange={unInputChange}
        className="form-control"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={empleado.password}
        onChange={unInputChange}
        className="form-control"
        placeholder="Password"
      />
      <input
        type="text"
        name="telefono"
        value={empleado.telefono}
        onChange={unInputChange}
        className="form-control"
        placeholder="Teléfono"
      />
      <button type="submit" className="btn btn-primary">Crear</button>
    </form>
  );
}
