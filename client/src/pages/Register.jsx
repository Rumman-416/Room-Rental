import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { notification } from "antd";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e, role) => {
    e.preventDefault();
    try {
      // Validate form fields
      if (!name || !email || !password) {
        return notification.error({
          message: "Error",
          description: "Please fill all the required fields.",
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return notification.error({
          message: "Error",
          description: "Please enter a valid email address.",
        });
      }
      if (password.length < 6 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return notification.error({
          message: "Error",
          description:
            "Password should be at least 6 characters long and contain at least one special character.",
        });
      }
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          username: name,
          email: email,
          password: password,
          role: role === "renter" ? true : false, // Convert to boolean
        }
      );
      console.log(response.data);
      notification.success({
        message: "Registered successfully",
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      notification.error({
        message: "Registration error",
        description: error.message || "An error occurred during registration.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const gradientBackground = {
    backgroundImage: "linear-gradient(to right, #FFDAB9, #FFA07A)",
  };
  return (
    <div className="w-full h-full" style={gradientBackground}>
      <div className="mx-10 xl:mx-10 flex flex-col h-[100vh] justify-center items-center lp:items-center lg:flex-row  lg:justify-between lg:px-5 lg:gap-5 xl:gap-[10rem]">
        <div className="h-0 w-0 opacity-0 lg:h-[95%] lg:w-[45%] lg:opacity-100 flex justify-end items-center rounded-xl">
          <img
            src="Images/auth-forgot-password-illustration-light.png"
            alt=""
            className="w-[30vw] xl:w-auto xl:max-h-[70%]"
          />
        </div>
        <div className="flex flex-col justify-center items-center lg:w-[50%] bg-white rounded-lg shadow-lg shadow-gray-500">
          <div className="flex flex-col gap-2 my-8 justify-center items-center">
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
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <h1 className="text-PC text-[13px]">Email </h1>{" "}
              <input
                type="text"
                placeholder="Enter your email or username"
                className="border w-full p-2 focus:outline-none"
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
            <div className="flex flex-col justify-around px-5 items-center text-center w-full">
              <div className="w-full my-1">
                <input
                  type="submit"
                  value="Register as Renter"
                  className="bg-BT text-white w-full p-2 rounded-md"
                  onClick={(e) => submitHandler(e, "renter")}
                />
              </div>
              <div className="w-full my-1 mb-10">
                <input
                  type="submit"
                  value="Register as Landlord"
                  className="bg-BT text-white w-full p-2 rounded-md"
                  onClick={(e) => submitHandler(e, "landlord")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
