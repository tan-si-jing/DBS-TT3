import React, { useState } from "react";
// import express from "express";
// import cors from "cors";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import classes from "./AuthForm.module.css";

function Login() {
    // // const express = require('express');
    // // const cors = require('cors');
    
    // const app = express();
    
    // // 👇️ configure CORS
    // app.use(express.json())
    // app.use(cors());

    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          username,
          password,
        });

        setCookies("access_token", response.data.token);

        window.localStorage.setItem("userID", response.data.userID);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
}

export default Login;

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className={classes.form}>
      <form onSubmit={onSubmit}>
        <h1>{label}</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">{label}</button>
        </div>
      </form>
    </div>
  );
};