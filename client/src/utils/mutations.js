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

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
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
