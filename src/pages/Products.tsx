import SelectBrand from "@/SelectBrand";
import SelectCategory from "@/SelectCategory";
import EditProduct from "@/components/EditProduct";
import SelectConnectivityPowerSource from "@/components/SelectConnectivityPowerSource";
import SelectOS from "@/components/SelectOS";
import SellProduct from "@/components/SellProduct";
import DeleteProduct from "@/components/deleteProduct";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteManyProductsMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import { Product } from "@/redux/features/product/productSlice";
import { useState } from "react";

const Products = () => {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [connectivity, setConnectivity] = useState("");
  const [powerSource, setPowerSource] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [bulkDelete] = useDeleteManyProductsMutation(undefined);

  const { data: products } = useGetAllProductsQuery({
    name: search,
    brand: brand,
    category: category,
    connectivity: connectivity,
    powerSource: powerSource,
    operatingSystem: operatingSystem,
    maxPrice: price,
  });

  const handleCheckboxChange = (productId: string) => {
    if (productId === "all") {
      // Toggle between selecting all and clearing selection
      setSelectedProducts((prevSelected) =>
        prevSelected.length === products?.data.gadgets.length
          ? []
          : products?.data.gadgets.map((product: Product) => product._id) || []
      );
    } else {
      setSelectedProducts((prevSelected) => {
        if (prevSelected.includes(productId)) {
          return prevSelected.filter((id) => id !== productId);
        } else {
          return [...prevSelected, productId];
        }
      });
    }
  };

  const handleBulkDelete = () => {
    bulkDelete({ data: selectedProducts });
  };

  console.log(selectedProducts);

  return (
    <div className=" space-y-3 p-5">
      <div className="flex  flex-col md:flex-row   gap-2 ">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <Input
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price range from 0"
        />
        <SelectBrand setBrand={setBrand} />
        <SelectCategory setCategory={setCategory} />
        <SelectConnectivityPowerSource
          setConnectivity={setConnectivity}
          setPowerSource={setPowerSource}
        />
        <SelectOS setOperatingSystem={setOperatingSystem} />
      </div>

      <div className="rounded-md border  ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>
                <Checkbox
                  onCheckedChange={() => handleCheckboxChange("all")}
                  checked={
                    selectedProducts.length === products?.data.gadgets.length
                  }
                />
              </TableCell>
              <TableCell className="font-semibold">Product</TableCell>
              {columns.map((head) => (
                <TableCell
                  className={`${head.className} font-semibold`}
                  key={head.label}>
                  {head.label}
                </TableCell>
              ))}

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products &&
              products.data.gadgets.map((product: Product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={() => handleCheckboxChange(product._id)}
                      checked={selectedProducts.includes(product._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={product.imageUrl} alt="product" />
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell className={column.className} key={column.label}>
                      {product[column.value]}
                    </TableCell>
                  ))}

                  <TableCell className="flex item-center gap-2">
                    <SellProduct _id={product._id} />
                    <EditProduct product={product} />
                    <DeleteProduct _id={product._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <Button onClick={handleBulkDelete} disabled={selectedProducts.length < 1}>
        Delete Selected
      </Button>
    </div>
  );
};

const columns: {
  label: string;
  value: keyof Product;
  className?: string;
}[] = [
  { label: "Name", value: "name" },
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Category",
    value: "category",
    className: "hidden md:table-cell",
  },
  {
    label: "Quantity",
    value: "quantity",
  },
  {
    label: "Brand",
    value: "brand",
    className: "hidden md:table-cell",
  },
  {
    label: "OS",
    value: "operatingSystem",
    className: "hidden md:table-cell",
  },
];

export default Products;
