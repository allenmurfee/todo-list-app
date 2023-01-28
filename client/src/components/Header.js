import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

export default function Header() {
  if (Auth.loggedIn()) {
    return (
      <header class="header">
        <div>
          <h1 class="title">To-do List App</h1>
          <h3>Turn your to-do's into to-done!</h3>
        </div>
        <div class="navbar">
          <button class="button">Profile</button>
          <button class="button" onClick={() => Auth.logout()}>
            Logout
          </button>
        </div>
      </header>
    );
  } else {
    return (
      <header class="header">
        <div>
          <h1 class="title">To-do List App</h1>
          <h3>Turn your to-do's into to-done!</h3>
        </div>
        <div class="navbar">
          <button class="button">
            <Link to="/login">Login</Link>
          </button>
          <button class="button">
            <Link to="/signup">Signup</Link>
          </button>
        </div>
      </header>
    );
  }
}
