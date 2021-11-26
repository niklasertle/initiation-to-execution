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
  mutation createProject($title:String, $description:String, $startDate:String, $endDate:String){
  createProject(title:$title, description:$description, startDate:$startDate, endDate:$endDate) {
    _id
    title
    description
  }
}

`;
