import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate, Route } from "react-router-dom";
import Auth from "../utils/auth";
import Signup from "../components/Signup";
import Login from "../components/Login";

const LoginPage = (props) => {
  //   const [formState, setFormState] = useState({ email: "", password: "" });
  //   //   LOGIN_USER ISNT DEFINED YET
  //   const [login, { error, data }] = useMutation(LOGIN_USER);

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;

  //     setFormState({
  //       ...formState,
  //       [name]: value,
  //     });
  //   };
  if (Auth.loggedIn()) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <div>
        <h1 className="small-header">
          Welcome to To-do List App! Please log in or sign up.
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
