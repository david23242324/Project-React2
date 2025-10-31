import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import UserList from './UserList';
import Login from './Login';

function App() {
return (
<div>
    <BrowserRouter>
    <Routes>
        <Route path='./' element={<Login />}/>
        <Route path='./lista' element={<UserList />}/>
    </Routes>
    </BrowserRouter>
</div>
);
}

export default App;