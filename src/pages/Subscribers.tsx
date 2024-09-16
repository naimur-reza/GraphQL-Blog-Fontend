import { GET_ALL_SUBSCRIBERS } from "@/graphQL/query";
import { useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/Loading";

const Subscribers = () => {
  const { data, loading } = useQuery(GET_ALL_SUBSCRIBERS);

  if (loading) return <LoadingSpinner />;

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
          {data?.getAllNewsLetters?.map(
            (item: { id: string; email: string; createdAt: string }) => (
              <TableRow key={item.id}>
                <TableCell>{item.email}</TableCell>

                <TableCell className="hidden md:table-cell">
                  {new Date(parseInt(item.createdAt)).toLocaleDateString()}
                </TableCell>
              </TableRow>
            )
          )}
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
    title: "Email",
    value: "email",
  },

  {
    title: "Subscribed",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export default Subscribers;
