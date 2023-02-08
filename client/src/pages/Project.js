import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROJECT, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";
import AddNew from "../components/AddNew";
import DeleteToDo from "../components/DeleteToDo";
import ChangeStatus from "../components/ChangeStatus";

function ProjectComponent() {
  const { projectId } = useParams();
  console.log("projectId:", projectId);

  //Query by a single project
  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { projectId: projectId },
  });
  console.log("project data", data);
  let project = data?.project || {};
  console.log("project info:", project);
  console.log("todos", project.toDos);

  if (Auth.loggedIn && loading) {
    return <h2>Loading...</h2>;
  } else if (Auth.loggedIn()) {
    let notStartedToDos = [];
    let inProgressToDos = [];
    let finishedToDos = [];

    let toDos = project.toDos ? project.toDos : [];
    console.log("toDos:", toDos);
    // console.log(typeof toDos);
    // console.log(toDos.length)
    // let stringifyToDos = JSON.stringify(toDos)
    // console.log(stringifyToDos)

    //Push each task into array based on status
    for (let i = 0; i < toDos.length; i++) {
      switch (toDos[i].status) {
        case "notStarted":
          notStartedToDos.push(toDos[i]);
          break;
        case "InProgress":
          inProgressToDos.push(toDos[i]);
          break;
        case "finished":
          finishedToDos.push(toDos[i]);
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
            {/* Map through each Not Started task to render */}
            {notStartedToDos.map((toDo) => {
              return (
                <li className="list-item">
                  {toDo.description}
                  {/* <button className="list-button" title="Edit">
                    /
                  </button> */}
                  {/* <button
                    className="list-button"
                    title="Move to 'In Progress'"
                  ></button> */}
                  <ChangeStatus
                    toDoId={toDo._id}
                    status={toDo.status}
                    projectId={projectId}
                  />
                  <DeleteToDo toDoId={toDo._id} projectId={projectId} />
                </li>
              );
            })}
          </ol>
        </section>
        <section className="card progress">
          <p>In Progress</p>
          <ol>
            {/* Map through each In Progress task to render */}
            {inProgressToDos.map((toDo) => {
              return (
                <li className="list-item">
                  {toDo.description}
                  {/* <button className="list-button" title="Edit">
                    /
                  </button> */}
                  {/* <button
                    className="list-button"
                    title="Move to 'Done'"
                  ></button> */}
                  <ChangeStatus
                    toDoId={toDo._id}
                    status={toDo.status}
                    projectId={projectId}
                  />
                  <DeleteToDo toDoId={toDo._id} projectId={projectId} />
                </li>
              );
            })}
          </ol>
        </section>
        <section className="card done">
          <p>Done</p>
          <ol>
            {/* Map through each Finished task to render */}
            {finishedToDos.map((toDo) => {
              return (
                <li className="list-item">
                  {toDo.description}
                  {/* <button className="list-button" title="Edit">
                    /
                  </button> */}
                  {/* <button
                    className="list-button"
                    title="Move to 'In Progress'"
                  ></button> */}
                  <DeleteToDo toDoId={toDo._id} projectId={projectId} />
                </li>
              );
            })}
          </ol>
        </section>
        <AddNew projectId={projectId} />
      </div>
    ) 
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}

export default ProjectComponent;
