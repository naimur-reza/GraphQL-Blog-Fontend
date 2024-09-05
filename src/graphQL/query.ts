import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query getAllPosts {
    posts {
      id
      title
      image
      published
      createdAt
    }
  }
`;
