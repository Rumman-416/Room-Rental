import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/AuthSlice/authSlice";

const RenterLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      // Extract token from response and save it to local storage
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Parse token after storing it in local storage
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        const userId = decodedToken.userId;

        // Dispatch action to update user ID in Redux store
        dispatch(login({ userId }));
        console.log(userId);
        window.alert("Logged in successfully");

        // Redirect to dashboard after successful login
        navigate("/renter-dashboard");
      } else {
        throw new Error("Failed to parse JWT token");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Login</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="border-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/register" className="text-blue-400">
          Don't have an account? Click here to signup
        </Link>
        <button type="submit" className="border-5 bg-yellow-500">
          Login
        </button>
      </form>
    </div>
  );
};

export default RenterLogin;
