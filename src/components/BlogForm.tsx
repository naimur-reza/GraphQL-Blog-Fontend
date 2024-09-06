/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IPost } from "../types/postType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { CREATE_POST, UPDATE_POST } from "@/graphQL/mutation";
import ErrorMessage from "./ErrorMessage";
import { createBlogSChema } from "./schema/validationSchema";
import { z } from "zod";
// import { useState } from "react";

const BlogForm = ({ post }: { post?: IPost }) => {
  // const [error, setError] = useState<string>("");

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: ["getAllPosts"],
    awaitRefetchQueries: true,
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: ["getAllPosts"],
    awaitRefetchQueries: true,
  });

  type BlogFormProps = z.infer<typeof createBlogSChema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<BlogFormProps>({ resolver: zodResolver(createBlogSChema) });

  const onsubmit = async (data: BlogFormProps) => {
    try {
      if (post) {
        await updatePost({
          variables: {
            updatePostId: post.id,
            post: {
              title: data.title,
              content: data.content,
            },
          },
        });
      } else {
        await createPost({
          variables: {
            title: data.title,
            content: data.content,
            image: "https://source.unsplash.com/random",
          },
        });
      }
    } catch (error) {
      // setError("An error occurred");
    }

    console.log(data);

    reset();
  };

  return (
    <div className="max-w-xl   mx-auto">
      {/* {error && alert("Space is required")} */}

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <Input
          defaultValue={post?.title}
          {...register("title")}
          placeholder="Title"
        />

        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Controller
          name="content"
          defaultValue={post?.content}
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Content" {...field} />
          )}
        />

        <ErrorMessage>{errors.content?.message}</ErrorMessage>

        <Button type="submit" disabled={isSubmitting}>
          {post ? "Update blog" : "Create blog"}
          {/* {isSubmitting && <Spinner />} */}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
