import { gql } from '@apollo/client';

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

export const QUERY_SINGLE_PROJECT = gql`
  query singleProject($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      title
      description
      deadline
      toDos
    }
  }
`;

export const QUERY_TODOS = gql`
    query allToDos {
        toDos {
        _id
        description
        status
        }
    }
`
export const QUERY_USERS =gql`
    query allUsers {
      _id
      name
    }
`
export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      email
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