import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO } from "../utils/mutations";

export default function ChangeStatus({ toDoId, toDoStatus, projectId }) {
  const [updateToDo, { error, data }] = useMutation(UPDATE_TODO);
  console.log("project id", projectId)
  console.log("toDo id", toDoId)
  console.log("toDo Status:", toDoStatus)

  const handleClick = async (event) => {
    console.log("Handle click firing");
    event.preventDefault();
    try {
      const { data } = await updateToDo({
        variables: { projectId, toDoId, toDoStatus },
      });
      console.log("update to do data", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="list-button" title="Delete" onClick={handleClick}>
      move
    </button>
  );
}
