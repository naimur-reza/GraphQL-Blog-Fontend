/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IPost } from "../types/postType";

const BlogForm = ({ post }: { post?: IPost }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm();

  const onsubmit = async (data: any) => {
    console.log(data);
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
          {post ? "Create blog" : "Update blog"}
          {/* {isSubmitting && <Spinner />} */}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
