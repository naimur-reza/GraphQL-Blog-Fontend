import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { IdCardIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { useSellProductMutation } from "@/redux/features/product/productApi";

import { toast } from "sonner";

const SellProduct = ({ _id, disabled }: { _id: string; disabled: boolean }) => {
  const { register, handleSubmit } = useForm();

  const [sellProduct] = useSellProductMutation();

  const onsubmit = async (data: FieldValues) => {
    if (disabled)
      return toast.error("You don't have permission to sell this product");

    try {
      const sellInfo = { _id, data };
      console.log(sellInfo);
      await sellProduct(sellInfo).unwrap();
      toast.success("Product Sold Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button
            disabled={disabled}
            variant={"destructive"}
            className="bg-sky-700/90 hover:bg-sky-900 ">
            <IdCardIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onsubmit)} className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Buyer Name
              </Label>
              <Input
                {...register("buyerName")}
                id="buyerName"
                type="text"
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-right">
                Product Quantity
              </Label>
              <Input
                {...register("quantity", { valueAsNumber: true })}
                id="quantity"
                type="number"
                className="col-span-3"
              />
            </div>

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="submit" variant="secondary">
                  Sell
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellProduct;
