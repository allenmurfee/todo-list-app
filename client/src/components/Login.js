import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate, Route } from "react-router-dom";
import Auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //Attempt to Login on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log("data here");

      console.log(data);
      var authStuff = await Auth.login(data.login.token);
      console.log("Auth Stuff");
      console.log(authStuff);

    } catch (e) {
      console.error("Login error", e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="card done">
      {/* Login Form */}
        <h3>Log In!</h3>
        <form onSubmit={handleFormSubmit}>
          <label>Email:</label>
          <input
            type="email"
            className="text-input"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            className="text-input"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
          />
          <br />
          <button className="nav-button" type="submit">Submit</button>
          <p></p>
        </form>
    </div>
  );
};

export default Login;
