import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectConnectivityPowerSource = ({
  defaultPowerSource,
  defaultConnectivity,
  setConnectivity,
  setPowerSource,
}: {
  defaultConnectivity?: string;
  defaultPowerSource?: string;
  setConnectivity: React.Dispatch<React.SetStateAction<string>>;
  setPowerSource: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <Select
        defaultValue={defaultConnectivity}
        onValueChange={(value) => setConnectivity(value)}>
        <SelectTrigger className=" ">
          <SelectValue placeholder={"Select Connectivity"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="wifi">Wi-Fi</SelectItem>
          <SelectItem value="bluetooth">Bluetooth</SelectItem>
          <SelectItem value="cellular">Cellular</SelectItem>
          <SelectItem value="ethernet">Ethernet</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={defaultPowerSource}
        onValueChange={(value) => setPowerSource(value)}>
        <SelectTrigger className=" ">
          <SelectValue placeholder={"Select Power Source"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="electric">Electric</SelectItem>
          <SelectItem value="battery">Battery</SelectItem>
          <SelectItem value="solar">Solar</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectConnectivityPowerSource;
