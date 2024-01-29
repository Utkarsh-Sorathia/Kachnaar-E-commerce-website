import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';  

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user)
 
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); 
  };

  return (
    <div>
      <h2>Home Page</h2>
      {
        user === null ? (
          <>

          </>
        ) : (<button onClick={handleLogout} className='btn btn-primary btn-block'>Logout</button>)
      }
      
    </div>
  );
}

export default HomePage;
