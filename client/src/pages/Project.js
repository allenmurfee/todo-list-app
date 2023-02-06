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
  const { data } = useQuery(QUERY_PROJECT, {
    variables: { projectId: projectId },
  });
  console.log("project data", data);
  let project = data?.project || {};
  console.log("project info:", project);
  console.log("todos", project.toDos);

  if (Auth.loggedIn()) {
    let notStartedToDos = [];
    console.log("not started to dos", notStartedToDos);
    let inProgressToDos = [];
    console.log("in progress to dos", inProgressToDos);
    let finishedToDos = [];
    console.log("finished to dos", finishedToDos);

    let toDos = project.toDos;
    console.log("toDos:", toDos);
    console.log(typeof toDos)
    // let stringifyToDos = JSON.stringify(toDos)
    // console.log(stringifyToDos)


    // for (let i = 0; i<stringifyToDos.length; i++)  {
    //   switch ("test") {
    //     case "notStarted":
    //       notStartedToDos.push(this.description);
    //       break;
    //     case "InProgress":
    //       inProgressToDos.push(this.description);
    //       break;
    //     case "finished":
    //       finishedToDos.push(this.description);
    //       break;
    //     default:
    //       console.log("No ToDos");
    //   }
    // };

    return (
      <div className="container">
        <section className="card start">
          <p>Haven't Started</p>
          <ol>
            {notStartedToDos.map((toDo) => {
              return (
                <li className="list-item">
                  {toDo.description}
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
                  {toDo.description}
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
                  {toDo.description}
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
