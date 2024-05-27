import { createSlice } from "@reduxjs/toolkit";
import { IAddress } from "../../types";

interface CheckoutItem {
  address: IAddress;
  card: any;
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {} as CheckoutItem,
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    addCard: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { addAddress, addCard } = checkoutSlice.actions;

export default checkoutSlice.reducer;
