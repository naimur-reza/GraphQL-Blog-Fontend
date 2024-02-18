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
import { TrashIcon } from "@radix-ui/react-icons";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";

const DeleteProduct = ({
  _id,
  disabled,
}: {
  _id: string;
  disabled: boolean;
}) => {
  const [deleteProduct] = useDeleteProductMutation(undefined);
  const handleDelete = async () => {
    if (disabled)
      return toast.error("You don't have permission to delete this product");

    try {
      await deleteProduct(_id);
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button disabled={disabled} type="button" variant="destructive">
            <TrashIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you want to delete this product?</DialogTitle>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={handleDelete}
                type="button"
                variant="destructive">
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteProduct;
