import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./UserList";
import Login from "./Login";
import AgregarEmpleado from "./AgregarEmpleado";
import EditarEmpleado from "./EditarEmpleado";
import ErrorEntrar from "./ErrorEntrar";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/usuarios" element={<UserList />} />

          <Route path="/agregar" element={<AgregarEmpleado/>}/>

          <Route path="/editar/:id" element={<EditarEmpleado/>}/>

          <Route path="/error" element={<ErrorEntrar/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;