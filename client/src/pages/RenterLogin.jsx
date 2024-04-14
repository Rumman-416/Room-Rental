// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/AuthSlice/authSlice';
// import bgImage from '../assets/images/';
// import starIcon from '../assets/images/star.png';
// import eyeIcon from '../assets/images/hide.png';
import bgImage from '../assets/images/bg.jpg';
import starIcon from '../assets/images/star (1).png';
import eyeIcon from '../assets/images/hide.png';

const RenterLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email: email,
        password: password,
      });
      // Extract token from response and save it to local storage
      const token = response.data.token;
      localStorage.setItem('token', token);
      // Parse token after storing it in local storage
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        const userId = decodedToken.userId;
        // Dispatch action to update user ID in Redux store
        dispatch(login({ userId }));
        console.log(userId);
        window.alert('Logged in successfully');
        // Redirect to dashboard after successful login
        navigate('/renter-dashboard');
      } else {
        throw new Error('Failed to parse JWT token');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:`url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-background rounded-tl-[1000px] shadow-lg p-8 max-w-md w-full">
      <div className="mb-10 mt-20 flex items-center">
  <img src={starIcon} alt="Leaf Icon" className="h-5 mr-0 ml-2" />
  <h1 className="text-2xl font-bold text-black-800 ml-6">Welcome Back</h1>
</div>

        <p className="text-black-600 mb-6 ml-3">Login to your account</p>
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder='Email'
              className="border border-gray-400 rounded-lg py-2 px-4 w-full"
              
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="border border-gray-400 rounded-lg py-2 px-4 w-full"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={eyeIcon}
              alt="Toggle Password Visibility"
              className="absolute right-4 top-2 h-5 w-5 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-black-800 font-bold cursor-pointer">Forgot Password?</p>
            <button
              type="submit"
              className="bg-BT text-black py-2 px-4 rounded-lg hover:bg-card -700 transition-colors duration-300"
            >
              Login
            </button>
          </div>
          <p className="text-black-600 text-center mt-4">
            Dont have an account? <Link to="/register" className="text-black-800 font-bold">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RenterLogin;