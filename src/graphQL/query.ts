import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query getAllPosts {
    posts {
      id
      title
      image
      content
      published
      createdAt
    }
  }
`;

export const GET_TOTAL_POST = gql`
  query getAllPostCount {
    totalPosts
  }
`;

export const GET_TOTAL_PUBLISHED_POST = gql`
  query totalPublishedPost {
    publishedPosts
  }
`;

export const GET_TOTAL_UNPUBLISHED_POST = gql`
  query totalUnpublishedPost {
    unpublishedPosts
  }
`;
