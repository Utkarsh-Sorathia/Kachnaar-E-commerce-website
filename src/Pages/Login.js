import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin, loginUser } from "../redux/userSlice";
import auth, { signInWithGooglePopup } from "../Firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../Firebase";
import logo1 from "./images/github.jpg";
import logo2 from "./images/facebook.jpg";
import "./logo.css";
import logo from "./images/google.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const specificAdminId = "admin@gmail.com";

  const Googleuser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    const user = response.user;
    dispatch(loginUser(user.displayName));
    db.collection(userType === "Admin" ? "admins" : "users")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          db.collection(userType === "Admin" ? "admins" : "users")
            .add({ email: user.email })
            .then((docRef) => {
              console.log("Document written with ID:", docRef.id);
              if (userType == "Admin") {
                navigate("/admin");
              } else {
                navigate("/home");
              }
            })
            .catch((error) => {
              console.error("Error adding document:", error);
            });
        } else {
          console.log("Duplicate data found");
          if (userType == "Admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }
      })
      .catch((error) => {
        console.error("Error querying document:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection(userType === "Admin" ? "admins" : "users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          db.collection(userType === "Admin" ? "admins" : "users")
            .add({
              email: email,
              password: password,
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

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        const user = res.user;

        if (userType === "Admin") {
          if (user.email === specificAdminId) {
            const displayName = user.email;
            updateProfile(user, { displayName });
            alert("Login Successful.");
            dispatch(loginAdmin(res.user.email));
            navigate("/admin");
          } else {
            alert("You are not authorized to access the admin page.");
          }
        } else {
          const displayName = user.email;
          updateProfile(user, { displayName });
          alert("Login Successful.");
          dispatch(loginUser(res.user.email));
          navigate("/home");
        }
      })
      .catch((error) => {
        alert("Invalid Username or Password");
        console.log(error);
      });
  };

  return (
    <>
      <div className="container2 ">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div
            className="container py-3 text-center border rounded"
            style={{ maxWidth: "500px" }}
          >
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-outline mb-2">
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
                  <br />
                  <br />
                  <Link to="/register">Don't have a account?</Link>
                  <br />
                  <br />
                  <p>
                    Login as:
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </p>
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
