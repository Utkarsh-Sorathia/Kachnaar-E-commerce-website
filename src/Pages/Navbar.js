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
  <nav className="navbar navbar-exand-lg navbar-dark bg-dark">
    <div className="d-flex">
      <Link to="/">
        <img
          className="mx-3"
          src={Logo}
          alt="egg"
          height="45"
          width="45"
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </Link>
      <Link
        className="navbar-brand text-light mx-3"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Home"
        to="/home"
      >
        Home
      </Link>
      <Link
        className="navbar-brand text-light mx-3"
        to="/contact"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Contact"
      >
        Contact Us
      </Link>
      <Link
        className="navbar-brand text-light mx-3"
        to="/about"
        data-toggle="tooltip"
        data-placement="bottom"
        title="About"
      >
        About Us
      </Link>
      <div className="search-box">
        <form className="d-flex mx-5" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control  me-2"
            placeholder="Search Plant Here..."
            style={{ height: "30px" }}
            value={query}
            onChange={handleChange}
            required
          />
          <button
            data-toggle="tooltip"
            data-placement="bottom"
            title="Search"
            type="submit"
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/search/${query}`)}
          >
            Search
          </button>
        </form>
      </div>
    </div>
    <div className="navbar-brand text-light mx-3"></div>
    <div className="mx-5 dropdown text-end">
      <Link className="navbar-brand mx-4" to="/cart">
        <img src={Cart} alt="cart" height="30" width="35" />
        <span className="h-75 position-absolute top-2 start-95 translate-middle badge rounded-pill bg-light text-dark">
          {cartItems}
          <span className="visually-hidden">unread messages</span>
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
            <Link to="/profile" className="text-decoration-none">
              <p className="dropdown-item">Hi, {user}!</p>
            </Link>
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
      <Link to="/admin/dashboard">
        <img
          className="google-image mx-3"
          src={Logo}
          alt="egg"
          height="45"
          width="45"
          style={{
            border: "2px solid white",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </Link>
      <Link className="navbar-brand text-light mx-3" to="/admin/dashboard">
        Dashboard
      </Link>
      <Link className="navbar-brand text-light mx-3" to="/admin/add">
        Add Product
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
      <nav className="navbar navbar-dark bg-dark py-1">
        <div className="d-flex justify-content-between mx-3">
          <Link onClick={handleHome}>
            <img
              className="google-image mx-3"
              src={Logo}
              alt="egg"
              height="45"
              width="45"
              style={{
                border: "2px solid white",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </Link>
          <Link to="/home" className="navbar-brand text-light mx-3">
            Home
          </Link>
          <Link to="/contact" className="navbar-brand text-light mx-3">
            Contact Us
          </Link>
          <Link to="/about" className="navbar-brand text-light mx-3">
            About Us
          </Link>
        </div>
        <div>
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mx-2"
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
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/login" className="btn btn-primary mx-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary mx-2">
            Register
          </Link>
        </div>
      </nav>
    );
  }
};

export default Navbar;
