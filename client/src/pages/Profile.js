import React, { useReducer } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

const Profile = ({ projects }) => {
  console.log(projects)
  if (!projects.length) {
    return <h2>No To-do Lists Yet!</h2>;
  }

  if (Auth.loggedIn()) {
    return (
      <div>
        <div className="small-header">
          <h1>Welcome, name!</h1>
        </div>

        <div className="project-container">
          <div className="card start">
            <h3>My Current To-do Lists</h3>
            <ol>
              {projects.map((project) => (
                <li key={project.id} class="list-item">
                  {project.todo}
                  <button class="list-button" title="Delete">
                    X
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="card done">
            <h3>My Finished To-do Lists</h3>
            <ol>
              <li className="list-item">
                Make Halloween Costume
                <button className="list-button" title="Delete">
                  X
                </button>
              </li>
              <li className="list-item">
                Clean up apartment
                <button className="list-button" title="Delete">
                  X
                </button>
              </li>
              <li className="list-item">
                Prepare for birthday party
                <button className="list-button" title="Delete">
                  X
                </button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Profile;
