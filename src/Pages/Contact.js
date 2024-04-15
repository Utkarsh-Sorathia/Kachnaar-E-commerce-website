import React, { useState } from "react";
import Navbar from "./Navbar";
import emailjs from "emailjs-com";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const service_id = process.env.REACT_APP_SERVICE; // Replace with your service ID
    const template_id = process.env.REACT_APP_TEMPLATE; // Replace with your template ID
    const user_id = process.env.REACT_APP_PUBLIC; // Replace with your user ID

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Kachnar",
      message: message,
    };

    emailjs
      .send(service_id, template_id, templateParams, user_id)
      .then((response) => {
        console.log("Email sent successfully!", response);
        toast.success("Message Sent Successfully", {
          position: "top-right",
          autoClose: 1500,
        });
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div
        className="container border mt-3 shadow"
        style={{ height: "500px", width: "500px", borderRadius: "10px" }}
      >
        <form className="form-control border-0" onSubmit={handleSubmit}>
          <h1 className="text-center mt-2">Contact Form</h1>
          <div className="form-outline p-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-outline p-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-outline p-3">
            <textarea
              placeholder="Message..."
              className="form-control form-control-lg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="form-outline p-3 text-center">
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
