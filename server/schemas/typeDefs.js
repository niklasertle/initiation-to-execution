const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
  }

  type Project {
      _id: ID!
      title: String
      description: String
      users: [User]
      calendar: [Calendar]
      khanBan: [KhanBan]
      messages: [Message]
      startDate: Int
      endDate: Int
  }

  type Calendar {
      _id: ID!
      title: String
      description: String
      userId: User
      dueDate: Int
      isComplete: Boolean
  }

  type KhanBan {
      _id: ID!
      title: String
      description: String
      userId: User
      status: String
  }

  type Message {
    _id: ID!
    message: String
    userId: User
    createdAt: Int
  }

  type Auth {
    token: ID!
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

    createProject(title: String!, description: String!, startDate: Int, endDate: Int): Project
    updateProject(projectId: ID!, title: String, description: String, startDate: Int, endDate: Int): Project
    addUserToProject(projectId: ID!, userId: ID!): Project
    removeProject(projectId: ID!): Project

    addCalendar(projectId: ID!, title: String!, description: String!, dueDate: Int): Project
    updateCalendar(projectId: ID!, title: String, description: String, dueDate: Int, isComplete: Boolean): Project
    removeCalendar(projectId: ID!): Project

    addKhanBan(projectId: ID!, title: String!, description: String!): Project
    updateKhanBan(projectId: ID!, title: String, description: String, status: String): Project
    removeKhanBan(projectId: ID!): Project

    addMessage(message: String!): Message
  }
`;

module.exports = typeDefs;
