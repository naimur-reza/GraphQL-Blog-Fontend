/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IPost } from "../types/postType";
import { useMutation } from "@apollo/client";
import { CREATE_POST, UPDATE_POST } from "@/graphQL/mutation";
import ErrorMessage from "./ErrorMessage";
import { createBlogSChema } from "./schema/validationSchema";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import uploadImage from "@/utils/uploadImage";
import { useState } from "react";
// import { useState } from "react";

const BlogForm = ({ post }: { post?: IPost }) => {
  const [loading, isLoading] = useState(false);
  // const [error, setError] = useState<string>("");

  const navigate = useNavigate();

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
    formState: { errors },
    reset,
  } = useForm<BlogFormProps>();

  const onsubmit = async (data: any) => {
    isLoading(true);
    const imageData = data.image ? await uploadImage(data.image[0]) : undefined;
    try {
      if (post) {
        isLoading(true);
        await updatePost({
          variables: {
            updatePostId: post.id,
            post: {
              title: data.title,
              content: data.content,
              image: imageData?.data?.display_url,
            },
          },
        });
        isLoading(false);
        navigate("/blogs");
        toast("Blog updated successfully.");
      } else {
        isLoading(true);
        await createPost({
          variables: {
            title: data.title,
            content: data.content,
            image: imageData?.data?.display_url,
          },
        });
        isLoading(false);
        navigate("/blogs");
        toast("Blog created successfully.");
      }
    } catch (error) {
      // setError("An error occurred");
      console.log(error);
      isLoading(false);
    }

    console.log(data);
    reset();
  };

  return (
    <div className="max-w-xl   mx-auto">
      {/* {error && alert("Space is required")} */}

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <Input
          required
          defaultValue={post?.title}
          {...register("title")}
          placeholder="Title"
        />
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Input
          required
          {...register("image")}
          placeholder="Upload Image"
          type="file"
          accept="image/*"
        />

        <ErrorMessage>{errors?.image?.message}</ErrorMessage>
        <Controller
          name="content"
          defaultValue={post?.content}
          control={control}
          render={({ field }) => (
            <SimpleMdeReact aria-required placeholder="Content" {...field} />
          )}
        />

        <ErrorMessage>{errors.content?.message}</ErrorMessage>

        <Button
          className="flex items-center gap-2"
          type="submit"
          disabled={loading}
        >
          {post ? "Update blog" : "Create blog"}
          {loading && (
            <span className="h-4  w-4 border-2 border-dashed rounded-full animate-spin" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
