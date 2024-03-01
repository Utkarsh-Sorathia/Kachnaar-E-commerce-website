import React from "react";
import Navbar from "./Navbar";

const Contact = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted!");
  }
  return (
    <>
      <Navbar />
      <div
        className="container border mt-3"
        style={{ height: "500px", width: "500px", borderRadius: "10px" }}
      >
        <form className="form-control border-0"  onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-center mt-2">Contact Form</h1>
          <div className="form-outline p-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email address"
              required
            />
          </div>
          <div className="form-outline p-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-outline p-3">
            <textarea
              placeholder="Message..."
              className="form-control form-control-lg"
            />
          </div>
          <div className="form-outline p-3 text-center">
            <button  type="submit" className="btn btn-primary">Send Message</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
