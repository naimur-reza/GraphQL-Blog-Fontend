import SelectBrand from "@/SelectBrand";
import SelectCategory from "@/SelectCategory";
import SelectConnectivityPowerSource from "@/components/SelectConnectivityPowerSource";
import SelectOS from "@/components/SelectOS";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { Product } from "@/redux/features/product/productSlice";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddProduct = (product: { product?: Product }) => {
  const { register, handleSubmit } = useForm();
  const [powerSource, setPowerSource] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [category, setCategory] = useState("");
  const [connectivity, setConnectivity] = useState("");
  const [brand, setBrand] = useState("");

  const navigate = useNavigate();

  const [addProduct] = useAddProductMutation(undefined);
  const [updateProduct] = useUpdateProductMutation(undefined);
  const onsubmit = async (fieldData: FieldValues) => {
    const data = {
      ...fieldData,
      powerSource: powerSource === "" ? undefined : powerSource,
      operatingSystem: operatingSystem === "" ? undefined : operatingSystem,
      category: category === "" ? undefined : category,
      connectivity: connectivity === "" ? undefined : connectivity,
      brand: brand === "" ? undefined : brand,
    };

    try {
      if (product.product) {
        await updateProduct({ _id: product.product._id, data });
        toast.success("Product Updated Successfully");
      } else {
        await addProduct(data);
        toast.success("Product Added Successfully");
        navigate("/products");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDuplicate = async () => {
    const duplicateData = {
      ...product.product,
      _id: undefined,
    };
    try {
      await addProduct(duplicateData);
      toast.success("Product Duplicated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)} className="p-5 ">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4  ">
          <Input
            defaultValue={product.product ? product.product.name : ""}
            {...register("name")}
            placeholder="Name"
          />
          <Input
            defaultValue={product.product ? product.product.price : ""}
            {...register("price")}
            placeholder="Price"
          />
          <Input
            defaultValue={product.product ? product.product.quantity : ""}
            {...register("quantity")}
            placeholder="Quantity"
          />
          <SelectBrand
            defaultBrand={product.product ? product.product.brand : ""}
            setBrand={setBrand}
          />
          <Input
            defaultValue={product.product ? product.product.model : ""}
            {...register("model")}
            placeholder="Model"
          />
          <SelectCategory
            defaultCategory={product.product ? product.product.category : ""}
            setCategory={setCategory}
          />
          <SelectOS
            defaultOS={product.product ? product.product.operatingSystem : ""}
            setOperatingSystem={setOperatingSystem}
          />
          <SelectConnectivityPowerSource
            defaultConnectivity={
              product.product ? product.product.connectivity : ""
            }
            defaultPowerSource={
              product.product ? product.product.powerSource : ""
            }
            setConnectivity={setConnectivity}
            setPowerSource={setPowerSource}
          />

          <Input
            defaultValue={
              product.product
                ? product.product.features.map((feature) => feature)
                : ""
            }
            {...register("features")}
            placeholder="Features"
          />
          <Input
            defaultValue={product.product ? product.product.imageUrl : ""}
            {...register("imageUrl")}
            placeholder="Photo url"
          />
        </div>

        {product.product ? (
          <DialogClose className="flex justify-end gap-2 mt-5">
            <Button type="submit">Update</Button>
            <Button onClick={handleDuplicate} type="button" variant="secondary">
              Duplicate
            </Button>
          </DialogClose>
        ) : (
          <Button className="mt-3" type="submit">
            Add
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
