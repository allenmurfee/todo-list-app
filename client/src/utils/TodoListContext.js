import React, { createContext, useContext, useState } from 'react';
import createId from './createId';

// Initialize new context for students
const TodoListContext = createContext();

// We create a custom hook to provide immediate usage of the student context value (students) in other components
export const useTodoListContext = () => useContext(TodoListContext);

// The provider is responsible for holding our state, updating the state, and persisting values to the children
export const TodoListProvider = ({ children }) => {
  
  // The value prop expects an initial state object
  return (
    <TodoListContext.Provider
      value={{ students, addStudent, removeStudent, majors }}
    >
      {/* We render children in our component so that any descendent can access the value from the provider */}
      {children}
    </TodoListContext.Provider>
  );
};