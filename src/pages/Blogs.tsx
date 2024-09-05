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
import { GET_BLOGS } from "@/graphQL/query";
import { IPost } from "@/types/postType";
import { useQuery } from "@apollo/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { Edit, Trash } from "lucide-react";

const Blogs = () => {
  const { data, loading, error } = useQuery(GET_BLOGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || "An error occurred"}</div>;

  const handleDelete = (id: string) => {
    console.log(data);
    console.log("Delete", id);
  };

  return (
    <div className="p-5">
      <Table className="rounded-md md:border">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.value}>{column.title}</TableHead>
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
              <TableCell>
                {new Date(parseInt(post.createdAt)).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex space-x-2">
                  <Modal
                    icon={
                      <Button className="rounded-full  p-3">
                        <Edit size={15} />
                      </Button>
                    }
                    title="Are you sure wanna delete?"
                    description="Once delete you can't restore it"
                  >
                    Done
                  </Modal>
                  <Modal
                    icon={
                      <Button className="rounded-full bg-rose-500/60 p-3">
                        <Trash size={15} />
                      </Button>
                    }
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
  },
  {
    title: "Actions",
    value: "actions",
  },
];

export default Blogs;
