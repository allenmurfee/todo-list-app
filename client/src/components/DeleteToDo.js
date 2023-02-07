import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../utils/mutations";

export default function DeleteToDo({toDoId, projectId}) {
  console.log(toDoId, projectId);

  const [deleteToDo, { error, data }] = useMutation(DELETE_TODO);

  const handleClick = async (event) => {
    console.log("Handle click firing")    
    event.preventDefault();
    try {
      const { data } = await deleteToDo({
        variables: { projectId, toDoId },
      });
      console.log("deleteToDo data", data);
    } catch (e) {
      console.error("Error deleting To Do", e);
    }
  };

  return (
    <button className="list-button" title="Delete" onClick={handleClick}>
      X
    </button>
  );
}
