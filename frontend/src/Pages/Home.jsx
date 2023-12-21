import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }
  return (
    <div style={{display: 'inline'}}>
      <h1>Home</h1>
      <button onClick={()=> logout()} style={{float: 'right', marginRight: '20px'}}>Logout</button>
    </div>
  );
};

export default Home;
