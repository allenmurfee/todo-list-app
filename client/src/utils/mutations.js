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
  mutation Mutation($projectId: ID!, $toDoId: ID!) {
    deleteToDo(projectId: $projectId, toDoId: $toDoId) {
      _id
      deadline
      description
      title
      toDos {
        _id
        description
        status
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId) {
      _id
      deadline
      description
      title
      toDos {
        _id
        description
        status
      }
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
