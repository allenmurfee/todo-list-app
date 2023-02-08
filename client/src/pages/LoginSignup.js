import React, { useState } from "react";
import { Link, Navigate, Route } from "react-router-dom";
import Auth from "../utils/auth";
import Signup from "../components/Signup";
import Login from "../components/Login";

const LoginPage = (props) => {

  if (Auth.loggedIn()) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <div>
        <h1 className="small-header">
          Welcome to Listify! Please log in or sign up.
        </h1>

        <div className="project-container">
          <Signup />
          <Login />
        </div>
      </div>
    );
  }
};

export default LoginPage;
