import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        <h1>Login</h1>
        <form action="" className="flex flex-col gap-3">
          <span>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="border-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="border-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <Link to="/register" className=" text-blue-400">
            Don't have an account ? Click here to signup
          </Link>
          <input
            type="submit"
            value="Registerrrrrrrr"
            className="border-5 bg-yellow-500 "
            // onClick={submitHandler}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
