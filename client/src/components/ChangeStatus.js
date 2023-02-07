import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT, REMOVE_PROJECT_FROM_USER } from "../utils/mutations";

export default function ChangeStatus({ projectId, userId}) {
    console.log("projectId", projectId);
    console.log("userId", userId);

  
    const [changeStatus, { error, data }] = useMutation(DELETE_PROJECT);

  
    const handleClick = async (event) => {
      console.log("Handle click firing")    
      event.preventDefault();
      try {
        const { data } = await deleteProject({
          variables: { projectId },
        });
        console.log("deleteToDo data", data);
        const test = await removeProjectFromUser({
            variables: { userId, projectId },
          });
        console.log("removeProjectFromUser data", test);

      } catch (e) {
        console.error("Error deleting Project", e);
      }
    };
  
    return (
      <button className="list-button" title="Delete" onClick={handleClick}>
        move
      </button>
    );
  }
