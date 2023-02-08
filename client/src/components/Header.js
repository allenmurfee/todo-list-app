import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

export default function Header() {
  if (Auth.loggedIn()) {
    return (
      <header className="header">
        <div>
          <h1 className="title"><Link to = "/">Listify <i class="fa-sharp fa-solid fa-list-check"></i></Link></h1>
          <h3>Turn your to-do's into to-done!</h3>
        </div>
        <div className="navbar">
          <button className="nav-button" onClick={() => Auth.logout()}>
            Logout
          </button>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <div>
          <h1 className="title"><Link to = "/login">Listify <i class="fa-sharp fa-solid fa-list-check"></i></Link></h1>
          <h3>Turn your to-do's into to-done!</h3>
        </div>
        <div className="navbar">
          <button className="nav-button">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </header>
    );
  }
}
