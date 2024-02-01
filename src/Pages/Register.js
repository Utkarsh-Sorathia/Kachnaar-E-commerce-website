import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../Firebase";
import logo from "./images/google.jpg";
import logo1 from "./images/github.jpg";
import logo2 from "./images/facebook.jpg";
import "./logo.css";
import { db } from "../Firebase";
import { signInWithGooglePopup } from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";

const Register = () => {
  const userId = uuidv4();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Googleuser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    const user = response.user;
    db.collection("users")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          // Document doesn't exist, add the new data
          db.collection("users")
            .add({ email: user.email })
            .then((docRef) => {
              console.log("Document written with ID:", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document:", error);
            });
        } else {
          // Document with the specified field value already exists
          console.log("Duplicate data found");
        }
      })
      .catch((error) => {
        console.error("Error querying document:", error);
      });
    dispatch(loginUser(response.user.email));
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (password.length < 6) {
      alert("Password length should be at least 6 characters.");
    } else {
      db.collection("users")
        .where("email", "==", email)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            // Document doesn't exist, add the new data
            db.collection("users")
              .add({
                userId:userId,
                email: email,
                password: password,
                name: name,
                username: username,
              })
              .then((docRef) => {
                console.log("Document written with ID:", docRef.id);
              })
              .catch((error) => {
                console.error("Error adding document:", error);
              });
          } else {
            // Document with the specified field value already exists
            console.log("Duplicate data found");
          }
        })
        .catch((error) => {
          console.error("Error querying document:", error);
        });

      // Create user in Firebase authentication
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("New User Created");
        alert("New User Created.");
        navigate("/");
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Error creating user. Please try again.");
      }
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
            <h2 className="text-center mb-2">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-2">
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
                <input
                  type="text"
                  id="name"
                  className="form-control form-control-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="username">
                  Name
                </label>
              </div>
              <div className="form-outline mb-2">
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
              <div className="form-outline mb-2">
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
              <div className="form-outline mb-2">
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
              <div className="text-center">
                <h5>
                  <u>OR</u>
                </h5>
                <Link>
                  <img
                    className="img mx-3"
                    src={logo}
                    alt="google"
                    onClick={Googleuser}
                  />
                </Link>
                <Link>
                  <img className="img mx-3" src={logo1} alt="Github" />
                </Link>
                <Link>
                  <img className="img mx-3" src={logo2} alt="facebook" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
