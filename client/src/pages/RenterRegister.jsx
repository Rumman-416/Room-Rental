import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";

const RenterLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
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
        }
      );
      console.log(response.data);
      window.alert("registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Login error:", error);
      window.alert("Login error", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // bg-[#f8f7fa]
  return (
    <div className=" mx-10 xl:mx-10  flex flex-col h-[100vh] justify-center items-center lp:items-center lg:flex-row  lg:justify-between lg:px-5 lg:gap-5 xl:gap-[10rem]">
      <div className=" h-0 w-0 opacity-0 lg:h-[95%]  lg:w-[45%] lg:opacity-100  flex justify-end items-center rounded-xl">
        <img
          src="Images/auth-forgot-password-illustration-light.png"
          alt=""
          className=" w-[30vw] xl:w-auto xl:max-h-[70%]"
        />
      </div>
      <div className=" flex flex-col justify-center items-start lg:w-[55%] ">
        <div className="flex flex-col gap-2 my-8 ">
          <img src="Images/logo.png" alt="" className="w-16" />
          <h1 className="text-[22px] xl:text-[1.625 rem] font-medium text-HC">
            Welcome to Rent Kar ! 👋
          </h1>
          <p className="text-PC text-[15px]">
            Please sign-in to your account and start the adventure
          </p>
        </div>
        <div className="w-full flex flex-col gap-5 lp:max-w-[25rem]">
          <div>
            <h1 className="text-PC text-[13px]">Name</h1>{" "}
            <input
              type="text"
              placeholder="Enter your name"
              className="border w-full p-2 focus:outline-none"
              // value={email}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h1 className="text-PC text-[13px]">Email </h1>{" "}
            <input
              type="text"
              placeholder="Enter your email or username"
              className="border w-full p-2 focus:outline-none"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-PC text-[13px]">Password</h1>
            </div>
            <div className="border w-full flex items-center justify-between px-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="............"
                className="w-10/12 p-2 focus:border-none focus:outline-none"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <GoEye className="text-lg" />
                ) : (
                  <GoEyeClosed className="text-[1.25rem] text-PC" />
                )}
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="Register"
            className="bg-BT text-white w-full p-2 rounded-md"
            onClick={submitHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default RenterLogin;
