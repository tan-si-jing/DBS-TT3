import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link, Navigate } from "react-router-dom";
import classes from "./AuthForm.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = {
    uname: "Invalid username",
    pass: "Invalid Password",
  };

  //   const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
      navigate("/auth/login");
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
      label="Register"
      handleSubmit={handleSubmit}
    />
  );
}

export default Register;

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  handleSubmit,
}) => {
  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">
            {label}
          </button>
        </div>
      </form>
    </div>
  );
};
