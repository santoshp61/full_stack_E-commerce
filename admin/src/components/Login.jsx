import React, { useState } from "react";
import axios from "axios";
// Import backendUrl from Context or define it here if App.js doesn't export it
const backendUrl = "http://localhost:4000";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // NOTE: For Admin Login, the path is usually /api/user/admin 
      // check your backend userRoute.js to see if it's 'admin' or 'login'
      const response = await axios.post(`http://localhost:5000/api/user/admin`, { email, password });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token); // Save for persistence
        toast.success("Admin Login Successful");
      } else {
        toast.error(response.data.message || "Admin login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Check port 4000.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-semibold mb-4 text-center'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='email'
              placeholder='admin@gmail.com'
              required
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='password'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black shadow-md active:bg-gray-800'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;