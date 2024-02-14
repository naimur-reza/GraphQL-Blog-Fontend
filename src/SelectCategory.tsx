import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
const SelectCategory = ({
  defaultCategory,
  setCategory,
}: {
  defaultCategory?: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select
      defaultValue={defaultCategory}
      onValueChange={(value) => setCategory(value)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="smartphones">Smartphones</SelectItem>
        <SelectItem value="laptops">Laptops</SelectItem>
        <SelectItem value="accessories">Accessories</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
