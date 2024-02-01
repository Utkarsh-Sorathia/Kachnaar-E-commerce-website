import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import auth, { signInWithGooglePopup } from "../Firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../Firebase";
import "./logo.css";
import logo from "./images/google.jpg";
import logo1 from "./images/github.jpg";
import logo2 from "./images/facebook.jpg";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Googleuser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    navigate("/home");
    const user = response.user;
    dispatch(loginUser(user.email));
    db.collection("users")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          db.collection("users")
            .add({
              email: user.email,
              password: user.password,
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        const user = res.user;
        const displayName = user.email;
        updateProfile(user, { displayName });
        // alert("Login Succesful.");
        dispatch(loginUser(res.user.email));
        navigate("/home");
      })
      .catch((error) => {
        alert("Invalid Username or Password");
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container2 text-center py-4">
        <h1>Welcome to My Website.</h1>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div
            className="container py-5 border rounded"
            style={{ maxWidth: "500px" }}
          >
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

                  <button type="submit" className="btn btn-primary btn-block">
                    Sign in
                  </button>

                  <Link
                    className="btn btn-primary btn-block mx-3"
                    to="/register"
                  >
                    Register
                  </Link>
                  <br />
                  <br />
                </form>
                <div className="text-center">
                  <h5>
                    <u>OR</u>
                  </h5>
                  <br />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
