import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPost } from "@/types/postType";
import { gql, useQuery } from "@apollo/client";

const Blogs = () => {
  const GET_BLOGS = gql`
    query getAllPosts {
      posts {
        title
        image
        published
        createdAt
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_BLOGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || "An error occurred"}</div>;

  console.log(data);

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
];

export default Blogs;
