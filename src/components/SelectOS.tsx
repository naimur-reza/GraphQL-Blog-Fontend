import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectOS = ({
  defaultOS,
  setOperatingSystem,
}: {
  defaultOS?: string;
  setOperatingSystem: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select
      defaultValue={defaultOS}
      onValueChange={(value) => setOperatingSystem(value)}>
      <SelectTrigger className=" ">
        <SelectValue placeholder={"Select Operating System"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="windows">Windows</SelectItem>
        <SelectItem value="macOS">macOS</SelectItem>
        <SelectItem value="linux">Linux</SelectItem>
        <SelectItem value="android">Android</SelectItem>
        <SelectItem value="ios">iOS</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectOS;
