import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RenterRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          username: name,
          email: email,
          password: password,
          renter: true,
        }
      );
      console.log(response.data); // Log the response from the server
      window.alert("registered successfully");

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1>Signup</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <span>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="border-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="border-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <Link to="/login" className="text-blue-400">
            Already have an account ? Click here to login
          </Link>
          <input
            type="submit"
            value="Register"
            className="border-2 bg-slate-500"
          />
        </form>
      </div>
    </>
  );
};

export default RenterRegister;
