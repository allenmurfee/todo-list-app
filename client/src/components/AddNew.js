import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../utils/mutations';

export default function AddNew(props) {
  const [newToDo, setNewToDo] = useState('');
  const [addToDo] = useMutation(ADD_TODO)

  const handleInputChange = (e) => {
    const { value } = e.target;

    
    return setNewToDo(value);
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    const { data } = addToDo({
      variables: {
        projectId: props.projectId,
        description: newToDo,
      },
    });
    console.log(data)
    setNewToDo('');
    
  };
  return (
    <div className="new-todo">
      <h3>Add a new to-do!</h3>
      <input 
        value={newToDo}
        name="newToDo"
        onChange={handleInputChange}
        type="text"
        
      />
      <button className="submit" type="submit" onClick={handleFormSubmit}>
        Add
      </button>
    </div>
  );
}
