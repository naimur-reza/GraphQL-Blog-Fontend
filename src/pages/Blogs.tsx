import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Blogs = () => {
  return (
    <div className="p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.value}>{column.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Introduction to React</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>2021-08-01</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Introduction to React</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>2021-08-01</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Introduction to React</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>2021-08-01</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Introduction to React</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>2021-08-01</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Introduction to React</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>2021-08-01</TableCell>
          </TableRow>
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
    title: "Title",
    value: "title",
  },
  {
    title: "Author",
    value: "author",
  },
  {
    title: "Date",
    value: "date",
  },
];

export default Blogs;
