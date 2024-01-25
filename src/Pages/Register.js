import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../Firebase';

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    createUserWithEmailAndPassword(auth,email, password)
      .then(async(res) => {
        alert("Logged in.")
        navigate('/');
      })
      .catch((error) => {
        console.log(error)
      });
    event.preventDefault();

    // Validation
    let isValid = true;
    if (isValid) {
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container py-5 border rounded" style={{ maxWidth: '500px' }}>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control form-control-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
