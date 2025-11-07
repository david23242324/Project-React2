import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const URL = "http://localhost:5001/api";

  const getUsers = async () => {
    try {
      const res = await axios.get(URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nombre || !email) return alert("Completa todos los campos");

    try {
      await axios.post(URL, {
        nombre,
        email,
        telefono: "0000000000",
        password: "1234"
      });
      getUsers();
      setNombre("");
      setEmail("");
    } catch (err) {
      console.error("Error al crear usuario:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        getUsers();
      } catch (err) {
        console.error("Error al eliminar usuario:", err);
      }
    }
  };

  const handleEdit = (user) => {
    navigate(`/editar/${user.id}`);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <div className="userlist-container">
        <h2 className="userlist-title">Gestión de Usuarios</h2>

        <table className="userlist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => handleEdit(u)}>Editar</button>
                  <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
