import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import classes from "./AuthForm.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [BankAcc, setBankAcc] = useState("");
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
        firstName,
        lastName,
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
      firstname={firstName}
      setfirstName={setfirstName}
      lastName={lastName}
      setlastName={setlastName}
      BankAcc={BankAcc}
      setBankAcc={setBankAcc}
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
  firstName,
  setfirstName,
  lastName,
  setlastName,
  BankAcc,
  setBankAcc,
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
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setfirstName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setlastName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="BankAcc">BankAccount:</label>
          <input
            type="text"
            id="BankAcc"
            value={BankAcc}
            onChange={(event) => setBankAcc(event.target.value)}
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
