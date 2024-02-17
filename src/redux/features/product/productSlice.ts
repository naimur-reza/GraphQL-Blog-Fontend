import { createSlice } from "@reduxjs/toolkit";

export type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  model: string;
  category: string;
  operatingSystem: string;
  connectivity: string;
  powerSource: string;
  features: [];
  imageUrl: string;
};

type TProductState = {
  products: Product[];
};

const initialState: TProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.name !== action.payload
      );
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
