const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Project {
      _id: ID
      title: String
      description: String
      users: [User]
      khanBan: [KhanBan]
      messages: [Message]
      startDate: String
      endDate: String
  }

  type KhanBan {
      _id: ID
      title: String
      description: String
      userId: User
      status: String
  }

  type Message {
    _id: ID
    message: String
    userId: User
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    projects(userId: ID!): [Project]
    project(projectId: ID!): Project
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createProject(title: String, description: String, startDate: String, endDate: String): Project
    addUserToProject(projectId: ID!, userId: ID!): Project
    deleteProject(projectId: ID!): Project
    addKhanBan(projectId: ID!, title: String!, description: String!): Project
    updateKhanBanStatus(projectId: ID!, khanBanId: ID!, status: String!): Project
    deleteKhanBan(projectId: ID!, khanBanId: ID!): Project
    addMessage(projectId: ID!, message: String!): Project
  }
`;

module.exports = typeDefs;
