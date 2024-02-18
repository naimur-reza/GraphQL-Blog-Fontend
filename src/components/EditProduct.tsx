import AddProduct from "@/pages/AddProduct";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Product } from "@/redux/features/product/productSlice";

const EditProduct = ({
  product,
  disabled,
}: {
  product?: Product;
  disabled: boolean;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button disabled={disabled} type="button" variant="secondary">
            <Pencil1Icon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <AddProduct product={product} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProduct;
