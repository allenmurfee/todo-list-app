import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate, Route } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_THOUGHTS } from "../utils/queries";
import { ADD_USER } from "../utils/mutations";

const Signup = (props) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  //   LOGIN_USER ISNT DEFINED YET
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token).then(() => {
        return <Navigate to="/profile" />;
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
      {/* SIGN UP */}
      <div className="card start">
        <h3>Sign Up!</h3>
        <form onSubmit={handleFormSubmit}>
          <label>Name:</label>
          <input
            type="text"
            className="text-input"
            name="name"
            placeholder="Name"
            value={formState.name}
            onChange={handleChange}
          />
          <br />
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
          {data ? (
            <Navigate to="/profile" replace={true} />
          ) : (
            <p>Invalid email. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
