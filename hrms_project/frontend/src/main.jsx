import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterOrg from './pages/RegisterOrg';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Teams from './pages/Teams';
import './styles.css';
function App(){
  return (
    <BrowserRouter>
      <div className="nav">
        <Link to="/">Home</Link> | <Link to="/employees">Employees</Link> | <Link to="/teams">Teams</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register Org</Link>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/register" element={<RegisterOrg/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/employees" element={<Employees/>} />
        <Route path="/teams" element={<Teams/>} />
      </Routes>
    </BrowserRouter>
  )
}
createRoot(document.getElementById('root')).render(<App />);
