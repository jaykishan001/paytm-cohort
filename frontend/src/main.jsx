import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import TransferMoney from './pages/TransferMoney.jsx';

const routes = (
  <Routes>
    <Route path="/dashboard" element={<App />} />
    <Route path="/register" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path='/transfer' element= {<TransferMoney/>} />
    <Route path="*" element={<div>404 - Page Not Found</div>} />
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>{routes}</BrowserRouter>
);
