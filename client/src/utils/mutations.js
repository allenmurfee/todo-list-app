import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($title: String!) {
    addProject(title: $title) {
      _id
      title
      description
      deadline
    }
  }
`;
export const ADD_TODO = gql`
  mutation addToDo($projectId: ID!, $description: String) {
    addToDo(projectId: $projectId, description: $description) {
      _id
      description
      status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteToDo($toDoId: [ID]!) {
    deleteToDo(toDoId: $toDoId) {
      
    }
  }
`;
export const UPDATE_TODO = gql`
  mutation updateToDo($toDoId: [ID]!, description: String!, status: String!) {
    updateToDo(toDoId: $toDoId, description: $description! status: $status!) {
      
    }
  }
`;
export const ADD_USER = gql`
  mutation Mutation($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        email
        name
      }
    }
  }
`;
