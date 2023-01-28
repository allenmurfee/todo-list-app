import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showLoginButton() {
    if (Auth.loggedIn()) {
      return (
        
        <div class="navbar">
            <button class="button">Profile</button>
            <button class="button" onClick={() => Auth.logout()}>Logout</button>
        </div>
      );
    } else {
      return (
        <div class="navbar">
            <button class="button">Login</button>
        </div>
      );
    }
  }

  return (
    <header class="header">
      <div>
        <h1 class="title">To-do List App</h1>
        <h3>Turn your to-do's into to-done!</h3>
      </div>
      {showLoginButton()}
      
    </header>
  );
}

export default Nav;
