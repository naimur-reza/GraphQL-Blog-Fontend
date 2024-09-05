import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createBlog($title: String!, $content: String!, $image: String!) {
    createPost(title: $title, content: $content, image: $image) {
      title
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updateBlog(
    $id: ID!
    $title: String!
    $content: String!
    $image: String!
  ) {
    updatePost(id: $id, title: $title, content: $content, image: $image) {
      title
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      title
    }
  }
`;
