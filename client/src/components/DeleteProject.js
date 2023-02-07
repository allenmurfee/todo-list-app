import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../utils/mutations";

export default function DeleteProject({ projectId}) {
    console.log("projectId", projectId);
  
    const [deleteProject, { error, data }] = useMutation(DELETE_PROJECT);
  
    const handleClick = async (event) => {
      console.log("Handle click firing")    
      event.preventDefault();
      try {
        const { data } = await deleteProject({
          variables: { projectId },
        });
        console.log("deleteToDo data", data);
      } catch (e) {
        console.error("Error deleting Project", e);
      }
    };
  
    return (
      <button className="list-button" title="Delete" onClick={handleClick}>
        X
      </button>
    );
  }
  