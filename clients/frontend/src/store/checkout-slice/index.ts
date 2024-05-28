import { createSlice } from "@reduxjs/toolkit";

// ** Types
import { IAddress } from "../../types";
import { ICardInfo } from "../../components/checkout/CardForm";

interface CheckoutItem {
  address: IAddress;
  card: ICardInfo;
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
