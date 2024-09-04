/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IPost } from "../types/postType";
import { gql, useMutation } from "@apollo/client";

const BlogForm = ({ post }: { post?: IPost }) => {
  const CREATE_POST = gql`
    mutation createBlog($title: String!, $content: String!, $image: String!) {
      createPost(title: $title, content: $content, image: $image) {
        title
      }
    }
  `;

  //   const UPDATE_POST = gql`
  //     mutation updateBlog(
  //       $id: ID!
  //       $title: String!
  //       $content: String!
  //       $image: String!
  //     ) {
  //       updatePost(id: $id, title: $title, content: $content, image: $image) {
  //         title
  //       }
  //     }
  //   `;

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: ["getAllPosts"],
    awaitRefetchQueries: true,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const onsubmit = async (data: any) => {
    if (post) {
      //   await updatePost({
      //     variables: {
      //       id: post.id,
      //       title: data.title,
      //       content: data.content,
      //       image: "https://source.unsplash.com/random"
      //     }
      //   });
    } else {
      await createPost({
        variables: {
          title: data.title,
          content: data.content,
          image: "https://source.unsplash.com/random",
        },
      });
    }

    console.log(data);

    reset();
  };

  return (
    <div className="max-w-xl  p-5 mx-auto">
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <Input
          defaultValue={post?.title || ""}
          {...register("title")}
          placeholder="Title"
        />

        {/* <ErrorMessage>{errors.title?.message}</ErrorMessage> */}
        <Controller
          name="content"
          defaultValue={post?.content || ""}
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Content" {...field} />
          )}
        />

        {/* <ErrorMessage>{errors.description?.message}</ErrorMessage> */}

        <Button disabled={isSubmitting}>
          {post ? "Update blog" : "Create blog"}
          {/* {isSubmitting && <Spinner />} */}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
