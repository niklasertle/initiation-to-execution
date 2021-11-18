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
      userId: [User]
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
