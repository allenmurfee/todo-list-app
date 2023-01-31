import React, { useState } from "react";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  //   LOGIN_USER ISNT DEFINED YET
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h1 className="small-header">
        Welcome to To-do List App! Please log in or sign up.
      </h1>

      <div className="project-container">
        <div className="card start">
          <h3>Sign Up!</h3>
          <form>
            <label>First Name:</label>
            <input
              type="text"
              className="text-input"
              name="first-name"
              placeholder="First Name"
            />
            <br />
            <label>Last Name:</label>
            <input
              type="text"
              className="text-input"
              name="last-name"
              placeholder="Last Name"
            />
            <br />
            <label>Email:</label>
            <input
              type="email"
              className="text-input"
              name="email"
              placeholder="Email"
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              className="text-input"
              name="password"
              placeholder="Password"
            />
            <br />
          </form>
        </div>

        <div className="card done">
          <h3>Log In!</h3>
          <form>
            <label>Email:</label>
            <input
              type="email"
              className="text-input"
              name="email"
              placeholder="Email"
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              className="text-input"
              name="password"
              placeholder="Password"
            />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};
