import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO } from "../utils/mutations";

export default function ChangeStatus({ toDoId, status, projectId }) {
  const [updateToDo, { error, data }] = useMutation(UPDATE_TODO);
  console.log("project id", projectId)
  console.log("toDo id", toDoId)
  console.log("toDo Status:", status)

  const handleClick = async (event) => {
    console.log("Handle click firing");
    event.preventDefault();
    try {
      const { data } = await updateToDo({
        variables: { projectId, toDoId, status },
      });
      console.log("update to do data", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="list-button" title="Move" onClick={handleClick}>
    <i class="fa-solid fa-arrow-right"></i>
    </button>
  );
}
