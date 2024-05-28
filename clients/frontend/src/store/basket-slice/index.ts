import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types";

interface BasketItem {
  product: IProduct;
  quantity: number;
}

const basketSlice = createSlice({
  name: "basket",
  initialState: [] as BasketItem[],
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    clearBasket: (state) => {
      state.length = 0;
    },
  },
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
