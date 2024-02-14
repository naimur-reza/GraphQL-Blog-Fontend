import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type SalesInfoCardProps = {
  label: string;
  amount: number | string;
  icon: LucideIcon;
};

const SalesInfoCard = (props: SalesInfoCardProps) => {
  return (
    <Card className="w-52">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">{props.label}</CardTitle>
        <props.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.amount}</div>
      </CardContent>
    </Card>
  );
};

export default SalesInfoCard;
