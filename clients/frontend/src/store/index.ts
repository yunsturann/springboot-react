import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import basketReducer from "./basket-slice";
import checkoutReducer from "./checkout-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
