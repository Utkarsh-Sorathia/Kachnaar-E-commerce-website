import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./images/Logo.png";
import "./logo.css";
import auth from "../Firebase";
import Cart from "./images/shopping-cart-icon.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [currentUser, setCurrentUser] = useState(null);
  const user = useSelector((state) => state.user);

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
    <>
      {isAuthenticated ? (
        <>
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
              <Link className="navbar-brand text-light mx-3" to="/new">
                New
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
                  {user ? <p className="dropdown-item">Hi, {user}!</p> : null}
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
        </>
      ) : (
        <>
          <nav className="navbar navbar-dark bg-dark py-3 d-flex justify-content-end">
            <Link to="/login" className="btn btn-primary mx-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary mx-2">
              Register
            </Link>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
