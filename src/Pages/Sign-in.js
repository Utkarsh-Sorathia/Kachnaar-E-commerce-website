import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import auth, { signInWithGooglePopup } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import logo from './google.jpg'
import './logo.css'

const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const Googleuser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
};
   
  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        alert('Logged in.'); 
        dispatch(loginUser(res.user.email));
        navigate('/home'); 
      })
      .catch((error) => {
        alert('Invalid Username or Password');
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container py-5 border rounded" style={{ maxWidth: '500px' }}>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <h2 className="text-center mb-4">Sign In</h2>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className="form-label">Email address</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="form-label">Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign in</button>

                <Link className="btn btn-primary btn-block mx-3" to="/register">Register</Link>

                <img className="img" src={logo} alt='google' onClick={Googleuser}></img>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
