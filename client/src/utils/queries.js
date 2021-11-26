import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getUsers {
    users {
      _id
      username
    }
  }
`;

export const GET_ALL_PROJECTS = gql`
  query projects {
    projects {
      _id
      title
      description
    }
  }
`;

export const GET_PROJECT = gql`
  query project($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      title
      description
      users {
        _id
        username
        email
      }
      calendar {
        _id
        title
        description
        userId {
          username
        }
        dueDate
        isComplete
      }
      khanBan {
        _id
        title
        description
        userId {
          username
        }
        status
      }
      messages {
        _id
        message
        userId {
          username
        }
        createdAt
      }
      startDate
      endDate
    }
  }
`;
