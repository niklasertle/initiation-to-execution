import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject(
    $title: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    createProject(
      title: $title
      description: $description
      startDate: $startDate
      endDate: $endDate
    ) {
      _id
      title
      description
    }
  }
`;

export const ADD_USER_TO_PROJECT = gql`
  mutation addUserToProject($projectId: ID!, $userId: ID!) {
    addUserToProject(projectId: $projectId, userId: $userId) {
      _id
      title
      description
      users {
        username
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId) {
      _id
    }
  }
`;

export const ADD_CALENDAR = gql`
  mutation addCalendar(
    $projectId: ID!
    $title: String!
    $description: String!
    $dueDate: String
  ) {
    addCalendar(
      projectId: $projectId
      title: $title
      description: $description
      dueDate: $dueDate
    ) {
      _id
      title
      description
      calendar {
        _id
        title
        description
        dueDate
        isComplete
      }
    }
  }
`;

export const UPDATE_CALENDAR = gql`
  mutation updateCalendar(
    $projectId: ID!
    $calendarId: ID!
    $isComplete: Boolean!
  ) {
    updateCalendar(
      projectId: $projectId
      calendarId: $calendarId
      isComplete: $isComplete
    ) {
      title
      description
      calendar {
        title
        description
        dueDate
        isComplete
      }
    }
  }
`;

export const DELETE_CALENDAR = gql`
  mutation deleteCalendar($projectId: ID!, $calendarId: ID!) {
    deleteCalendar(projectId: $projectId, calendarId: $calendarId) {
      title
      description
      calendar {
        title
      }
    }
  }
`;

export const ADD_KHAN_BAN = gql`
  mutation addKhanBan($projectId: ID!, $title: String!, $description: String!) {
    addKhanBan(
      projectId: $projectId
      title: $title
      description: $description
    ) {
      title
      description
      khanBan {
        _id
        title
        description
      }
    }
  }
`;

export const UPDATE_KHAN_BAN_STATUS = gql`
  mutation updateKhanBan($projectId: ID!, $khanBanId: ID!, $status: String!) {
    updateKhanBanStatus(
      projectId: $projectId
      khanBanId: $khanBanId
      status: $status
    ) {
      title
      description
      khanBan {
        _id
        title
        description
        status
      }
    }
  }
`;

export const DELETE_KHAN_BAN = gql`
  mutation deleteKhanBan($projectId: ID!, $khanBanId: ID!) {
    deleteKhanBan(projectId: $projectId, khanBanId: $khanBanId) {
      title
      description
      khanBan {
        _id
        title
        description
        status
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($projectId: ID!, $message: String!) {
    addMessage(projectId: $projectId, message: $message) {
      _id
      title
      description
      messages {
        message
      }
    }
  }
`;
