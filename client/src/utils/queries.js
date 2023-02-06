import { gql } from "@apollo/client";

//Multiple projects
export const QUERY_PROJECTS = gql`
  query allProjects {
    projects {
      _id
      title
      description
      deadline
      toDos
    }
  }
`;

//Single project
export const QUERY_PROJECT = gql`
  query project($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      title
      description
      deadline
      toDos {
        _id
        description
        status
      }
    }
  }
`;

//Query todos
export const QUERY_TODOS = gql`
  query allToDos {
    toDos {
      _id
      description
      status
    }
  }
`;

//Query user
export const QUERY_USER = gql`
  query user {
    user {
      _id
      email
      name
      projects {
        _id
        title
        deadline
        description
        toDos {
          _id
          description
          status
        }
      }
    }
  }
`;

// projects {
//   _id
//   title
//   deadline
//   description
//   toDos {
//     _id
//     description
//     status
//   }
