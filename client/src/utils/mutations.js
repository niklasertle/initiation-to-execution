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
      users {
        _id
        username
      }
    }
  }
`;

export const REMOVE_USER_FROM_PROJECT = gql`
  mutation removeUserFromProject($projectId: ID!, $userId: ID!) {
    removeUserFromProject(projectId: $projectId, userId: $userId) {
      users {
        _id
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

export const ADD_KANBAN = gql`
  mutation addKanbanCard($projectId: ID!, $title: String!, $status: String!) {
    addKanban(projectId: $projectId, title: $title, status: $status) {
      kanban {
        _id
        title
        status
      }
    }
  }
`;

export const UPDATE_KHAN_BAN_STATUS = gql`
  mutation updateKanban($projectId: ID!, $kanbanId: ID!, $status: String!) {
    updateKanbanStatus(
      projectId: $projectId
      kanbanId: $kanbanId
      status: $status
    ) {
      title
      description
      kanban {
        _id
        title
        userId
        status
      }
    }
  }
`;

export const DELETE_KANBAN = gql`
  mutation removeKanbanCard($projectId: ID!, $kanbanId: ID!) {
    deleteKanban(projectId: $projectId, kanbanId: $kanbanId) {
      kanban {
        _id
        title
        status
      }
    }
  }
`;
