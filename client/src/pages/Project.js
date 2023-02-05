import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import Auth from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";
import AddNew from "../components/AddNew";


function ProjectComponent(props) {
  console.log(props)
  //const { data } = useQuery(QUERY_USER);
  //console.log(data)
  const { projectId } = useParams()
  console.log(projectId)
  //TODO: Query by single project
  const {  data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId },
  });
  let project = data?.project || {};
  console.log(project)

  if (Auth.loggedIn()) {
      let notStartedToDos = [];
      let inProgressToDos = [];
      let finishedToDos = [];

      for (let toDo in project.toDos) {
        switch (toDo.status) {
          case "notStarted":
            notStartedToDos.push(toDo);
            break;
          case "InProgress":
            inProgressToDos.push(toDo);
            break;
          case "finished":
            finishedToDos.push(toDo);
            break;
        }
      }
      return (
        <div class="container">
          <section class="card start">
            <p>Haven't Started</p>
            <ol>
              {notStartedToDos.map((toDo) => {
                return (
                  <li class="list-item">
                    {toDo.description}
                    <button class="list-button" title="Edit">
                      /
                    </button>
                    <button
                      class="list-button"
                      title="Move to 'In Progress'"
                    ></button>
                    <button class="list-button" title="Delete">
                      X
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
          <section class="card progress">
            <p>In Progress</p>
            <ol>
              {inProgressToDos.map((toDo) => {
                return (
                  <li class="list-item">
                    {toDo.description}
                    <button class="list-button" title="Edit">
                      /
                    </button>
                    <button
                      class="list-button"
                      title="Move to 'In Progress'"
                    ></button>
                    <button class="list-button" title="Delete">
                      X
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
          <section class="card done">
            <p>Done</p>
            <ol>
              {finishedToDos.map((toDo) => {
                return (
                  <li class="list-item">
                    {toDo.description}
                    <button class="list-button" title="Edit">
                      /
                    </button>
                    <button
                      class="list-button"
                      title="Move to 'In Progress'"
                    ></button>
                    <button class="list-button" title="Delete">
                      X
                    </button>
                  </li>
                );
              })}

            </ol>
          </section>
          <AddNew />
        </div>
      );
    
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}

export default ProjectComponent;
