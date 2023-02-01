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