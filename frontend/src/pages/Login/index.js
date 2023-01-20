import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../utils/api';


function Login({setIsLoggedIn, loggedIn, setUser}) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate()

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  function handleSubmit(event){
    event.preventDefault();
    // logIn(formState)
    logIn(formData)
    .then((data) => {
      localStorage.token = data.token
      setIsLoggedIn(true)
      setUser(data.user)

  })
    
  };

  useEffect(() => {
    if (localStorage.token) {
        navigate('/Profile')
    }
}, [loggedIn])

  
  // Note that we need to use `htmlFor` instead of `for` in JSX
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={formData.username}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />
      <button type="submit">Login</button>
    </form>
  );
}
export default Login;