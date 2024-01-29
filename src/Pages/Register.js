import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../Firebase";
import logo from "./google.jpg";
import "./logo.css";
import { db } from "../Firebase";
import { signInWithGooglePopup } from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";

const Register = () => {
  const userId = uuidv4();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Googleuser = async () => {
   
      const response = await signInWithGooglePopup();
      console.log(response);
      dispatch(loginUser(response.user.email));
      navigate("/home")

      if (response == undefined)
      {
        alert("Error"); 
      }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Add user to Firestore
      await db.collection("users").add({
        id: userId,
        username: username,
        email: email,
        password: password,
      });

      // Create user in Firebase authentication
      const authResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("New User Created:", authResponse);

      alert("New User Created.");
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="container py-5 border rounded"
        style={{ maxWidth: "500px" }}
      >
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

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Register
              </button>
              <br />
              <img
                className="img"
                src={logo}
                alt="google"
                onClick={Googleuser}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
