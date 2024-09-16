import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createBlog($title: String!, $content: String!, $image: String!) {
    createPost(title: $title, content: $content, image: $image) {
      title
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($updatePostId: ID!, $post: PostInput!) {
    updatePost(id: $updatePostId, post: $post) {
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

export const DELETE_SUBSCRIBER = gql`
  mutation deleteSub($deleteNewsLetterId: ID!) {
    deleteNewsLetter(id: $deleteNewsLetterId) {
      email
    }
  }
`;
