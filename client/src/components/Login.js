import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate, Route } from "react-router-dom";
import Auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  //   LOGIN_USER ISNT DEFINED YET
  const [login, { error, data }] = useMutation(LOGIN);

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

      Auth.login(data.login.token).then(() => {
        return <Navigate to="/" replace={true}/>;
      });
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
      {/* LOGIN */}
      <div className="card done">
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
