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
    addProject(userId: ID!, title: String!, description: String!, deadline: String!): User
    addProjectToDb(title: String!, description: String!, deadline: String!): Project
    addProjectToUser(userId: ID!, projectId: ID!): User
    addToDo(projectId: ID, description: String!): Project
    updateToDo( projectId: ID!, toDoId: ID!, status: String!): Project
    deleteProject(projectId: ID!): Project
    removeProjectFromUser(userId: ID!, projectId: ID!): User
    deleteToDo(projectId: ID!, toDoId: ID!): Project
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
