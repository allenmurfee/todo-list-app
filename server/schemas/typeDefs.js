const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Project {
    _id: ID
    title: String
    description: String
    deadline: String
    toDos: [ToDo]
  }

  type ToDo {
    _id: ID
    description: String
    status: String
  }

  type User {
    _id: ID
    name: String
    email: String
    projects: [Project]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    projects(user: ID, name: String): [Project]
    project(projectId: ID!): Project
    toDos(project: ID): [ToDo]
    user: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addProject(title: String!): User
    addToDo(projectId: ID, description: String!): ToDo
    updateToDo(toDoId: ID!, description: String!, status: String!): ToDo
    deleteProject(projectId: ID!): Project
    deleteToDo(toDoId: ID!): ToDo
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
