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
import Navbar from "./Navbar";

const Register = () => {
  const userId = uuidv4();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-solid fa-eye-slash");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHidePassword = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) =>
      prevIcon === "fa-solid fa-eye-slash"
        ? "fa-solid fa-eye"
        : "fa-solid fa-eye-slash"
    );
  };

  const Googleuser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    const user = response.user;
    db.collection("users")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          db.collection("users")
            .add({ email: user.email })
            .then((docRef) => {
              console.log("Document written with ID:", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document:", error);
            });
        } else {
          console.log("Duplicate data found");
        }
      })
      .catch((error) => {
        console.error("Error querying document:", error);
      });
    dispatch(loginUser(response.user.email));
    navigate("/login");
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
            db.collection("users")
              .add({
                userId: userId,
                email: email,
                password: password,
                name: name,
                username: username,
                cart: [],
              })
              .then((docRef) => {
                console.log("Document written with ID:", docRef.id);
              })
              .catch((error) => {
                console.error("Error adding document:", error);
              });
          } else {
            console.log("Duplicate data found");
          }
        })
        .catch((error) => {
          console.error("Error querying document:", error);
        });

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("New User Created.");
        navigate("/login");
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Error creating user. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container2 d-flex justify-content-center align-items-center min-vh-100 py-4">
        <div className="container py-3 text-center border rounded bg-white mx-2" style={{ maxWidth: "450px" }}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10">
              <h2 className="text-center mb-2">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-2">
                  <input
                    type="text"
                    id="username"
                    className="form-control form-control-lg"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="text"
                    id="name"
                    className="form-control form-control-lg"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-2">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    value={email}
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-2 d-flex align-items-center position-relative">
                  <input
                    type={type}
                    placeholder="Password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="position-absolute end-0 top-50 translate-middle-y"
                    onClick={handleHidePassword}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  >
                    <i className={icon}></i>
                  </span>
                </div>
                <div className="form-outline mb-2 d-flex align-items-center position-relative">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control form-control-lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center mb-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block "
                  >
                    Register
                  </button>
                </div>
                <Link to="/login">Already have a account?</Link>
                <br />
                <br />
                <div className="text-center">
                  <h5>
                    <u>OR</u>
                  </h5>
                  <div className="d-flex justify-content-center flex-wrap gap-2">
                    <button type="button" className="btn btn-link p-0 border-0" onClick={Googleuser}>
                      <img className="img" src={logo} alt="google" />
                    </button>
                    <button type="button" className="btn btn-link p-0 border-0">
                      <img className="img" src={logo1} alt="Github" />
                    </button>
                    <button type="button" className="btn btn-link p-0 border-0">
                      <img className="img" src={logo2} alt="facebook" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
