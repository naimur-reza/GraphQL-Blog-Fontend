import SalesInfoCard from "@/components/SalesInfoCard";
import { useGetTotalRevenueQuery } from "@/redux/features/product/productApi";
import { CreditCard, Cuboid } from "lucide-react";

const Dashboard = () => {
  const { data, isLoading } = useGetTotalRevenueQuery(undefined);

  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div>
      <div className="flex space-x-3 md:grid-cols-2 lg:grid-cols-3 p-5">
        <SalesInfoCard
          label="Total Sales"
          amount={`$${data.results?.totalRevenue || 0}`}
          icon={CreditCard}
        />
        <SalesInfoCard
          label="Items Sales"
          amount={data?.results?.totalItems || 0}
          icon={Cuboid}
        />
      </div>
    </div>
  );
};

export default Dashboard;
