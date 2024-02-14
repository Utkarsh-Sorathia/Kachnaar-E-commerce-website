import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin, logoutUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./images/Logo.png";
import "./logo.css";
import Cart from "./images/shopping-cart-icon.png";

const UserNavbar = ({ handleLogout, user, cartItems }) => (
  <nav className="navbar navbar-exand-lg navbar-dark bg-dark">
    <div>
      <img
        className="google-image mx-3"
        src={Logo}
        alt="egg"
        height="45"
        width="45"
      ></img>
      <Link className="navbar-brand text-light mx-3" to="/home">
        Home
      </Link>
      <Link className="navbar-brand text-light mx-3" to="/contact">
        Contact Us
      </Link>
      <Link className="navbar-brand text-light mx-3" to="/about">
        About Us
      </Link>
    </div>
    <div className="mx-3 dropdown text-end">
      <Link className="navbar-brand mx-4" to="/cart">
        <img src={Cart} alt="cart" height="30" width="35"></img>
        <span class="position-absolute top-2 start-95 translate-middle badge rounded-pill bg-light text-dark ">
          {cartItems}
          <span class="visually-hidden">unread messages</span>
        </span>
      </Link>
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
          {user ? (
            <p className="dropdown-item">Hi, {user}!</p>
          ) : (
            <p className="dropdown-item">Hi, admin!</p>
          )}
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  </nav>
);

const AdminNavbar = ({ handleLogout, admin }) => (
  <nav className="navbar navbar-exand-lg navbar-dark bg-dark">
    <div>
      <img
        className="google-image mx-3"
        src={Logo}
        alt="egg"
        height="45"
        width="45"
      ></img>
      <Link className="navbar-brand text-light mx-3" to="/admin/add">
        Add Product
      </Link>
      <Link className="navbar-brand text-light mx-3" to="/admin/home">
        Admin Home
      </Link>
      <Link className="navbar-brand text-light mx-3" to="/admin/manage">
        Manage Users
      </Link>
    </div>
    <div className="mx-3 dropdown text-end">
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
          <p className="dropdown-item">Hi, {admin}!</p>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  </nav>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const cartItems = useSelector((state) => state.totalItems);

  const handleLogout = () => {
    if (admin) {
      dispatch(logoutAdmin());
      navigate("/");
    } else {
      dispatch(logoutUser());
      navigate("/");
    }
  };

  if (isAuthenticated) {
    if (admin) {
      return <AdminNavbar handleLogout={handleLogout} admin={admin} />;
    } else {
      return (
        <UserNavbar
          handleLogout={handleLogout}
          user={user}
          cartItems={cartItems}
        />
      );
    }
  } else {
    return (
      <nav className="navbar navbar-dark bg-dark py-1 d-flex justify-content-end">
        <Link to="/login" className="btn btn-primary mx-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary mx-2">
          Register
        </Link>
      </nav>
    );
  }
};

export default Navbar;
