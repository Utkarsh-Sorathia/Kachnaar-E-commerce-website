import React from "react";
import Navbar from "./Navbar";
import "./logo.css";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
