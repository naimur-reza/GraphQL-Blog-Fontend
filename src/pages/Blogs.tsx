import BlogForm from "@/components/BlogForm";
import Modal from "@/components/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DELETE_POST } from "@/graphQL/mutation";
import { GET_BLOGS } from "@/graphQL/query";
import { IPost } from "@/types/postType";
import { useMutation, useQuery } from "@apollo/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { Edit, Trash } from "lucide-react";

const Blogs = () => {
  const { data, loading, error } = useQuery(GET_BLOGS);

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_BLOGS }],
    awaitRefetchQueries: true,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || "An error occurred"}</div>;

  const handleDelete = (id: string) => {
    try {
      deletePost({
        variables: {
          deletePostId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <Table className="rounded-md md:border ">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead className={column.className} key={column.value}>
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.posts.map((post: IPost) => (
            <TableRow key={post.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>HP</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.published ? "True" : "False"}</TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(parseInt(post.createdAt)).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex space-x-2">
                  <Modal
                    icon={<Edit size={15} />}
                    title="Update this post?"
                    description="You can update this post by clicking the button below"
                  >
                    <BlogForm post={post} />
                  </Modal>
                  <Modal
                    color="bg-rose-500/80"
                    icon={<Trash size={15} />}
                    title="Are you sure wanna delete?"
                    description="Once delete you can't restore it"
                  >
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button
                          onClick={() => handleDelete(post.id)}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </Modal>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const columns: {
  title: string;
  value: string;
  className?: string;
}[] = [
  {
    title: "Image",
    value: "image",
  },
  {
    title: "Title",
    value: "title",
  },
  {
    title: "Published",
    value: "Published",
  },
  {
    title: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
  {
    title: "Actions",
    value: "actions",
  },
];

export default Blogs;
