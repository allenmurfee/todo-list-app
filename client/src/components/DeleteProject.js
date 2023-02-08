import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PROJECT, REMOVE_PROJECT_FROM_USER } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";

export default function DeleteProject({ projectId, userId }) {
  console.log("projectId", projectId);
  console.log("userId", userId);

  const [deleteProject, { error, data }] = useMutation(DELETE_PROJECT);
  // const [removeProjectFromUser] = useMutation(REMOVE_PROJECT_FROM_USER);

  const handleClick = async (event) => {
    console.log("Handle click firing");
    event.preventDefault();
    try {
      const { data } = await deleteProject({
        variables: { projectId },
      });
      console.log("deleteToDo data", data);
      window.location.reload()
      // const test = await removeProjectFromUser({
      //     variables: { userId, projectId },
      //   });
      // console.log("removeProjectFromUser data", test);
    } catch (e) {
      console.error("Error deleting Project", e);
    }
  };

  return (
    <button className="list-button" title="Delete" onClick={handleClick}>
    <i class="fa-solid fa-xmark"></i>
    </button>
  );
}
