import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

const SelectBrand = ({
  defaultBrand,
  setBrand,
}: {
  defaultBrand?: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select
      defaultValue={defaultBrand}
      onValueChange={(value) => setBrand(value)}>
      <SelectTrigger className=" ">
        <SelectValue placeholder={"Select Brand"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="samsung">Samsung</SelectItem>
        <SelectItem value="dell">Dell</SelectItem>
        <SelectItem value="hp">HP</SelectItem>
        <SelectItem value="sony">Sony</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectBrand;
