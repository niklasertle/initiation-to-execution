import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    me {
      username
      email
      savedBooks {
        authors
        title
        description
        bookId
        image
        link
      }
    }
  }
`;