import React, { useReducer } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_USER } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import DeleteProject from "../components/DeleteProject";

const Home = async () => {
  const { loading, data } = useQuery(QUERY_USER);
  console.log("Home page data", data);
  let projects =  data?.user.projects || [];
  // // console.log(projects)

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (!projects.length) {
    return <h2>No To-do Lists Yet!</h2>;
  } else if (Auth.loggedIn()) {
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
                <li key={project._id} className="list-item">
                  <Link to={`/project/${project._id}`}>
                    {project.title}
                    <DeleteProject  projectId={project._id}/>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Home;
