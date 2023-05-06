// //C:\react-js\myreactdev\src\App.js
import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateClaim from "./pages/CreateClaim";
import UpdateClaim from "./pages/UpdateClaim";

const App = () => {
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        {/* <h1 className="page-header text-center">
          React-JS and Python Flask CRUD Create, Read, Update and Delete
          MySql-Database
        </h1> */}

        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createclaim" element={<CreateClaim />} />
            <Route path="/editclaim" element={<UpdateClaim />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
