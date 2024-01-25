import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../Firebase';

const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
    signInWithEmailAndPassword(auth,email, password)
      .then(async(res) => {
        alert("Logged in.")
      })
      .catch((error) => {
        console.log(error)
      });
      navigate('/home');
    } else {
      console.log('Form is not valid. Please check your input.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container py-5 border rounded" style={{ maxWidth: '500px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <h2 className="text-center mb-4">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={rememberMe}
                    id="form1Example3"
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Sign in
              </button>

              <Link className="btn btn-primary btn-block mx-3" to="/register">
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
