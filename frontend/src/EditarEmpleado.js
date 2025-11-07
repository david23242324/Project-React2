import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarEmpleado() {
  const urlBase = "http://localhost:5001/api/";
  const navegacion = useNavigate();
  const { id } = useParams();

  const [empleado, setEmpleado] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: ""
  });

  useEffect(() => {
    cargarEmpleado();
  }, []);

  const cargarEmpleado = async () => {
    try {
      const resultado = await axios.get(`${urlBase}${id}`);
      setEmpleado(resultado.data);
    } catch (error) {
      console.error("Error al cargar el empleado:", error);
    }
  };

  const onInputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${urlBase}${id}`, empleado);
      navegacion("/usuarios");
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={empleado.nombre}
          onChange={onInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={empleado.email}
          onChange={onInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          name="password"
          value={empleado.password}
          onChange={onInputChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="telefono" className="form-label">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={empleado.telefono}
          onChange={onInputChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Actualizar</button>
    </form>
  );
}
