import React, { useState } from 'react';
import './Admin.css';
import { useDispatch } from 'react-redux';
import { loginDispatcher } from '../../../redux/features/AuthSlice';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Perform form validation (optional)
    if (!data.email || !data.password) {
      alert('Please enter your email and password.');
      return;
    }

    const response  = await dispatch(loginDispatcher(data)); // Dispatch the login action with form data  
    if(response.status == 200){
      navigate('/Admin_page')
    }
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          value={data.email} // Set the value from state
          onChange={handleChange} // Handle input changes
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          value={data.password} // Set the value from state
          onChange={handleChange} // Handle input changes
        />
        <button type="submit">SIGN IN</button>
      </form>
      <p><a href="#">Forgot your password?</a></p>
    </div>
  );
};
