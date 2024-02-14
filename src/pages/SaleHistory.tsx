import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSaleHistoriesQuery } from "@/redux/features/product/productApi";
import { ISalesProduct } from "@/types/salesProduct.type";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

const SaleHistory = () => {
  const { data } = useGetSaleHistoriesQuery(undefined);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(
    null
  );
  const [filteredSales, setFilteredSales] = useState<ISalesProduct[]>(
    data?.data.sales || []
  );

  useEffect(() => {
    if (data) {
      filterSalesByDate(data.data.sales, selectedDateFilter);
    }
  }, [data, selectedDateFilter]);

  const handleDateFilterChange = (value: string) => {
    setSelectedDateFilter(value);
  };

  const filterSalesByDate = (
    sales: ISalesProduct[],
    timeRange: string | null
  ) => {
    if (!timeRange) {
      setFilteredSales(sales);
      return;
    }

    const currentDate = new Date();
    let startDate: Date, endDate: Date;

    switch (timeRange) {
      case "daily":
        startDate = startOfDay(currentDate);
        endDate = endOfDay(currentDate);
        break;
      case "weekly":
        startDate = startOfWeek(currentDate);
        endDate = endOfWeek(currentDate);
        break;
      case "monthly":
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
        break;
      case "yearly":
        startDate = startOfYear(currentDate);
        endDate = endOfYear(currentDate);
        break;
      default:
        setFilteredSales(sales);
        return;
    }

    const filtered = sales.filter((sale) => {
      const saleDate = new Date(sale.createdAt);

      if (timeRange === "daily") {
        return saleDate >= startDate && saleDate <= endDate;
      } else if (timeRange === "monthly") {
        return (
          saleDate.getMonth() === currentDate.getMonth() &&
          saleDate.getFullYear() === currentDate.getFullYear()
        );
      } else {
        return saleDate >= startDate && saleDate <= endDate;
      }
    });

    setFilteredSales(filtered);
  };

  return (
    <div className="p-5 space-y-3">
      <div>
        <Select onValueChange={(value) => handleDateFilterChange(value)}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter Sales History By" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHead.map((head) => (
                <TableCell className={`${head.className} p-2`} key={head.label}>
                  {head.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale._id}>
                {tableHead.map((column) => (
                  <TableCell
                    className={`${column.className} p-2`}
                    key={column.label}>
                    {sale[column.value]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const tableHead: {
  label: string;
  value: keyof ISalesProduct;
  className?: string;
}[] = [
  {
    label: "Product Name",
    value: "productName",
  },
  {
    label: "Total Price",
    value: "totalPrice",
  },
  {
    label: "Quantity",
    value: "quantity",
  },
  {
    label: "Buyer Name",
    value: "buyerName",
  },
  {
    label: "Date",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export default SaleHistory;
