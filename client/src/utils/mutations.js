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
  mutation AddProject(
    $userId: ID!
    $title: String!
    $description: String!
    $deadline: String!
  ) {
    addProject(
      userId: $userId
      title: $title
      description: $description
      deadline: $deadline
    ) {
      _id
      name
      email
      projects {
        _id
        title
        description
        deadline
      }
    }
  }
`;

export const ADD_PROJECT_TO_DB = gql`
  mutation addProjectToDb(
    $title: String!
    $description: String!
    $deadline: String!
  ) {
    addProjectToDb(
      title: $title
      description: $description
      deadline: $deadline
    ) {
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

export const ADD_TODO = gql`
  mutation AddToDo($projectId: ID, $description: String!) {
    addToDo(projectId: $projectId, description: $description) {
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

export const REMOVE_PROJECT_FROM_USER = gql`
  mutation Mutation($userId: ID!, $projectId: ID!) {
    removeProjectFromUser(userId: $userId, projectId: $projectId) {
      _id
      email
      name
      projects {
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
  }
`;

export const ADD_PROJECT_TO_USER = gql`
  mutation Mutation($userId: ID!, $projectId: ID!) {
    addProjectToUser(userId: $userId, projectId: $projectId) {
      _id
      email
      name
      projects {
        _id
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateToDo($projectId: ID!, $status: String!, $toDoId: ID!) {
    updateToDo(projectId: $projectId, status: $status, toDoId: $toDoId) {
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
