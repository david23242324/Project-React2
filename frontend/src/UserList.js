import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Header";

function UserList() {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

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
      await axios.post(URL, { nombre, email, password: "1234" });
      getUsers();
      setNombre("");
      setEmail("");
    } catch (err) {
      console.error("Error al crear usuario:", err);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setNombre(user.nombre);
    setEmail(user.email);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${editId}`, { nombre, email });
      getUsers();
      setEditId(null);
      setNombre("");
      setEmail("");
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
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

  return (
    <div className="page-wrapper">
      <Header />

      <div className="userlist-container">
        <h2 className="userlist-title">Gestión de Usuarios</h2>

        <form onSubmit={editId ? handleUpdate : handleCreate} className="form">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">
            {editId ? "Actualizar" : "Crear"}
          </button>
          {editId && (
            <button type="button" onClick={() => setEditId(null)}>
              Cancelar
            </button>
          )}
        </form>

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
