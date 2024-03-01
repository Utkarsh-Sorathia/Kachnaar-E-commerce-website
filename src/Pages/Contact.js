import React, { useRef } from "react";
import Navbar from "./Navbar";
import emailjs, { init } from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // service_id, templte_id and public key will get from Emailjs website when you create account and add template service and email service
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE,
        process.env.REACT_APP_TEMPLATE,
        form.current,
        process.env.REACT_APP_PUBLIC
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <Navbar />
      <div
        className="container border mt-3"
        style={{ height: "500px", width: "500px", borderRadius: "10px" }}
      >
        <form
          className="form-control border-0"
          ref={form}
          onSubmit={(e) => sendEmail(e)}
        >
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
