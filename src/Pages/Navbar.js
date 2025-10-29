import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin, logoutUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./images/kachnar.jpeg";
import "./logo.css";
import Cart from "./images/shopping-cart-icon.png";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";

const UserNavbar = ({
  handleLogout,
  user,
  cartItems,
  handleChange,
  handleSubmit,
  query,
  navigate,
}) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">
        <img
          className="me-2"
          src={Logo}
          alt="logo"
          height="45"
          width="45"
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About Us
            </Link>
          </li>
        </ul>
        <form className="d-flex mx-2 mb-2 mb-lg-0" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search Plant Here..."
            style={{ height: "30px" }}
            value={query}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/search/${query}`)}
          >
            Search
          </button>
        </form>
        <div className="d-flex align-items-center gap-2">
          <Link className="position-relative me-2" to="/cart">
            <img src={Cart} alt="cart" height="30" width="35" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
              {cartItems}
              <span className="visually-hidden">unread messages</span>
            </span>
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-link text-light text-decoration-none dropdown-toggle p-2"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              <i className="fa-solid fa-user"></i>
            </button>
            <ul 
              className="dropdown-menu dropdown-menu-end shadow" 
              aria-labelledby="userDropdown"
              style={{ minWidth: "200px", marginTop: "8px" }}
            >
              <li>
                {user ? (
                  <Link to="/profile" className="text-decoration-none">
                    <span className="dropdown-item py-2">
                      <i className="fa-solid fa-user me-2"></i>
                      Hi, {user}
                    </span>
                  </Link>
                ) : (
                  <span className="dropdown-item py-2">
                    <i className="fa-solid fa-user-shield me-2"></i>
                    Hi, admin
                  </span>
                )}
              </li>
              <li><hr className="dropdown-divider my-1" /></li>
              <li>
                <button 
                  className="dropdown-item py-2" 
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const AdminNavbar = ({ handleLogout, admin }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link to="/admin/dashboard" className="navbar-brand">
        <img
          className="me-2"
          src={Logo}
          alt="logo"
          height="45"
          width="45"
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/add">
              Add Product
            </Link>
          </li>
        </ul>
        <div className="dropdown">
          <button
            className="btn btn-link text-light text-decoration-none dropdown-toggle p-2"
            type="button"
            id="adminDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            <i className="fa-solid fa-user-shield"></i>
          </button>
          <ul 
            className="dropdown-menu dropdown-menu-end shadow" 
            aria-labelledby="adminDropdown"
            style={{ minWidth: "200px", marginTop: "8px" }}
          >
            <li>
              <span className="dropdown-item py-2">
                <i className="fa-solid fa-user-shield me-2"></i>
                Hi, {admin}
              </span>
            </li>
            <li><hr className="dropdown-divider my-1" /></li>
            <li>
              <button 
                className="dropdown-item py-2" 
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-right-from-bracket me-2"></i>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const email = useSelector((state) => state.user);
  const [cartProducts, setCartProducts] = useState([]);
  const db = firebase.firestore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (email) {
      db.collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const cart = doc.data().cart.map((item) => item);
            setCartProducts(cart);
          });
        })
        .catch((error) => {
          console.error("Error fetching cart products:", error);
        });
    }
  }, [db, email]);

  const totalItemsInCart = cartProducts.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

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
          cartItems={totalItemsInCart}
          query={query}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          navigate={navigate} // Passing navigate function to UserNavbar
        />
      );
    }
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" onClick={handleHome}>
            <img
              className="me-2"
              src={Logo}
              alt="logo"
              height="45"
              width="45"
              style={{
                border: "2px solid white",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
            </ul>
            <form className="d-flex mx-2 mb-2 mb-lg-0" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search Plant Here..."
                style={{ height: "30px" }}
                value={query}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={() => navigate(`/search/${query}`)}
              >
                Search
              </button>
            </form>
            <div className="d-flex">
              <Link to="/login" className="btn btn-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
