import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom'; 

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); 
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={handleLogout} className='btn btn-primary btn-block'>Logout</button>
    </div>
  );
}

export default HomePage;
