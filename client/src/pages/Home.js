import React, { useReducer } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import AddNewProject from "../components/AddNewProject"
import DeleteProject from "../components/DeleteProject";

//Render home page
const Home = () => {
  const { loading, data } = useQuery(QUERY_USER);
  console.log("Home page data", data);
  let projects = data?.user.projects || [];
  console.log(projects);

  if (loading && Auth.loggedIn()) {
    return <h1>Loading...</h1>;
  } else if (Auth.loggedIn()) {
    return projects.length ? (
      <div>
        <div className="small-header">
          <h1>Welcome, {data.user.name}!</h1>
        </div>

        <div className="project-container">
          <div className="card start">
            <h3>My Current To-do Lists</h3>
            <ol>
              {/* Map through user's projects */}
              {projects.map((project) => (
                <li key={project._id} className="list-item">
                  <Link to={`/project/${project._id}`}>
                    {project.title}
                    <DeleteProject
                      projectId={project._id}
                      userId={data.user._id}
                    />
                  </Link>
                </li>
              ))}
            </ol>
            <AddNewProject userId={data.user._id}/>
          </div>
        </div>
      </div>
    ) : (
      <h2>No To-do Lists Yet!</h2>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Home;
