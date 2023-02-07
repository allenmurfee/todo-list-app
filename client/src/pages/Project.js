import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROJECT } from "../utils/queries";
import Auth from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";
import AddNew from "../components/AddNew";

function ProjectComponent() {
  const { projectId } = useParams();
  console.log("projectId:", projectId);

  //TODO: Query by single project
  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { projectId: projectId },
  });
  console.log("project data", data);
  let project = data?.project || {};
  console.log("project info:", project);
  console.log("todos", project.toDos);

  if (Auth.loggedIn && loading){
    return (
      <h2>Loading...</h2>
    )
  }else if(Auth.loggedIn()) {
    let notStartedToDos = [];
    let inProgressToDos = [];
    let finishedToDos = [];

    let toDos = project.toDos ? project.toDos : [];
    console.log("toDos:", toDos);
    // console.log(typeof toDos);
    console.log(toDos[0].status)
    // console.log(toDos.length)
    // let stringifyToDos = JSON.stringify(toDos)
    // console.log(stringifyToDos)

    for (let i = 0; i < toDos.length; i++) {
      switch (toDos[i].status) {
        case "notStarted":
          notStartedToDos.push(toDos[i].description);
          break;
        case "InProgress":
          inProgressToDos.push(toDos[i].description);
          break;
        case "finished":
          finishedToDos.push(toDos[i].description);
          break;
        default:
          console.log("No ToDos");
      }
    }
    console.log("not started to dos", notStartedToDos);
    console.log("in progress to dos", inProgressToDos);
    console.log("finished to dos", finishedToDos);

    return (
      <div className="container">
        <section className="card start">
          <p>Haven't Started</p>
          <ol>
            {notStartedToDos.map((toDo) => {
              return (
                <li className="list-item">
                  {toDo}
                  <button className="list-button" title="Edit">
                    /
                  </button>
                  <button
                    className="list-button"
                    title="Move to 'In Progress'"
                  ></button>
                  <button className="list-button" title="Delete">
                    X
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
        <section className="card progress">
          <p>In Progress</p>
          <ol>
            {inProgressToDos.map((toDo) => {
              return (
                <li className="list-item">
                  {toDo}
                  <button className="list-button" title="Edit">
                    /
                  </button>
                  <button
                    className="list-button"
                    title="Move to 'In Progress'"
                  ></button>
                  <button className="list-button" title="Delete">
                    X
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
        <section className="card done">
          <p>Done</p>
          <ol>
            {finishedToDos.map((toDo) => {
              return (
                <li className="list-item">
                  {toDo}
                  <button className="list-button" title="Edit">
                    /
                  </button>
                  <button
                    className="list-button"
                    title="Move to 'In Progress'"
                  ></button>
                  <button className="list-button" title="Delete">
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
