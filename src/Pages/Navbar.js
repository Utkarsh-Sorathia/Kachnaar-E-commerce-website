import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import google from "./images/google.jpg";
import "./logo.css";
import auth from "../Firebase";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark py-1">
      <div className="mx-3">
        <img
          className="google-image mx-3"
          src={google}
          alt="egg"
          height="45"
          width="45"
        ></img>
        <a className="navbar-brand text-light " href="/home">
          Home
        </a>
        <a className="navbar-brand text-light" href="/new">
          New
        </a>
      </div>
      <div className="mx-5 dropdown text-end">
        <a
          href="#"
          className="link-light dropdown-toggle"
          role="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i
            className="fa-solid fa-user rounded-circle"
            width="40"
            height="40"
          ></i>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end text-small"
          aria-labelledby="userDropdown"
        >
          <li>
            {currentUser ? (
              <p className="dropdown-item">Hi, {currentUser.displayName}!</p>
            ) : (
              <p className="dropdown-item">Hi,!</p>
            )}
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          {isAuthenticated ? (
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Log out
              </button>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
