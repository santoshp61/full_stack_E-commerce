import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currState, setCurrState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // New state for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const { setToken, navigate, backendUrl } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (currState === 'Sign Up') {
        response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
      } else {
        response = await axios.post(backendUrl + '/api/user/login', { email, password });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${currState} Successful!`);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-300 rounded focus:border-black outline-none transition-all'
          placeholder='Name'
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-300 rounded focus:border-black outline-none transition-all'
        placeholder='Email'
        required
      />

      {/* --- IMPROVED PASSWORD FIELD --- */}
      <div className="relative w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          className='w-full px-3 py-2 border border-gray-300 rounded focus:border-black outline-none transition-all'
          placeholder='Password'
          required
        />
        {/* Toggle Button */}
        <p
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold cursor-pointer text-gray-400 hover:text-black uppercase select-none"
        >
          {showPassword ? "Hide" : "Show"}
        </p>
      </div>

      <div className='w-full flex justify-between text-xs mt-[-4px] text-gray-500'>
        <p className='cursor-pointer hover:text-black transition-colors'>Forgot your password?</p>
        {
          currState === 'Login'
            ? <p onClick={() => { setCurrState('Sign Up'); setShowPassword(false) }} className='cursor-pointer hover:text-black font-medium underline'>Create account</p>
            : <p onClick={() => { setCurrState('Login'); setShowPassword(false) }} className='cursor-pointer hover:text-black font-medium underline'>Login Here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-10 py-2.5 mt-4 rounded-sm active:scale-95 transition-all shadow-md'>
        {currState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;