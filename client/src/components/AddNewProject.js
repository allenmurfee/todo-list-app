import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT, ADD_PROJECT_TO_DB } from "../utils/mutations";

export default function AddNew(props) {
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [newDeadline, setDeadline] = useState("");
  const [addProject] = useMutation(ADD_PROJECT);
  const [addProjectToDb] = useMutation(ADD_PROJECT_TO_DB);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    return name === "title"
      ? setTitle(value)
      : name === "description"
      ? setDescription(value)
      : setDeadline(value);
  };

  const handleFormSubmit = async (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    console.log(props.userId, newTitle, newDescription, newDeadline);
    const { data } = await addProject({
      variables: {
        userId: props.userId,
        title: newTitle,
        description: newDescription,
        deadline: newDeadline,
      },
    });
    console.log("add project to user", data);
    const db = await addProjectToDb({
      variables: {
        title: newTitle,
        description: newDescription,
        deadline: newDeadline,
      },
    });
    console.log("add project to DB", db);

    setTitle("");
    setDescription("");
    setDeadline("");
  };
  return (
    <div className="new-todo">
      <h3>Add a project!</h3>
      <input
        value={newTitle}
        name="title"
        onChange={handleInputChange}
        type="text"
        placeholder="Title"
      />
      <input
        value={newDescription}
        name="description"
        onChange={handleInputChange}
        type="text"
        placeholder="Description"
      />
      <input
        value={newDeadline}
        name="deadline"
        onChange={handleInputChange}
        type="text"
        placeholder="Deadline"
      />
      <button className="submit" type="submit" onClick={handleFormSubmit}>
        Add
      </button>
    </div>
  );
}
