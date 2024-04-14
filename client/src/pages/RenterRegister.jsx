/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/images/roberto-nickson-so3wgJLwDxo-unsplash.jpg";

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
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-background bg-opacity-60 backdrop-filter backdrop-blur-sm p-7 py-4 rounded-md max-w-md text-black text-sm">

        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div>
            <label htmlFor="name" className="block mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-200 text-black"
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1">
               Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-200 text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
               Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-200 text-black"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 rounded-md bg-gray-200 text-black"
            />
          </div>
          <input
            type="submit"
            value="Sign In"
            className="bg-BT hover:bg-background text-black font-bold py-2 px-4 rounded-md cursor-pointer"
          />
<p className="text-black-600 text-center mt-4">
Already Created an Account? <Link to="/login" className="text-black-800 font-bold">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RenterRegister;