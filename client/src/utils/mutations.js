import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
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
mutation AddToDo($description: String!, $projectId: ID) {
  addToDo(description: $description, projectId: $projectId) {
    _id
    description
    toDos {
      _id
      description
      status
    }
    title
  }
}
`;

export const DELETE_TODO = gql`
  mutation deleteToDo($toDoId: [ID]!) {
    deleteToDo(toDoId: $toDoId) {
      _id
    }
  }
`;
export const UPDATE_TODO = gql`
  mutation updateToDo($toDoId: [ID]!, $description: String!, $status: String!) {
    updateToDo(toDoId: $toDoId, description: $description, status: $status) {
      _id
      description
      status
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
