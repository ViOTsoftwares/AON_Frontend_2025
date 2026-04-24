import { createSlice } from "@reduxjs/toolkit";
import { toastMessage } from "../toastMessage";
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: initialCart,
    error: "",
    iscart: initialCart.length > 0 ? true : false,
  },
  reducers: {
    AddCart: (state, action) => {
      console.log("actionoooo", action);
      const check = state.cart.find((item) => item._id === action.payload._id);
      if (!check) {
        state.cart.push(action.payload);
        state.iscart = true;
        toastMessage("Product Added Successfully", "success");
      } else {
        state.error = "Product is already added";
        state.iscart = true;
        toastMessage("Product is already added", "warning");
        return state;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    IncreaseCartQty: (state, action) => {
      const id = action.payload;

      state.cart = state.cart.map((item) => {
        if (item._id === id && item.Qty <= 10) {
          return { ...item, Qty: item.Qty + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    DecreaseCartQty: (state, action) => {
      const id = action.payload;

      state.cart = state.cart.map((item) => {
        if (item._id === id && item.Qty <= 11) {
          return { ...item, Qty: item.Qty > 1 ? item.Qty - 1 : item.Qty };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    RemoveCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item._id !== id);
      if (state.cart.length === 0) {
        state.iscart = false;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    ClearCartProduct: (state, action) => {
      localStorage.removeItem("cart");
      return { cart: [], error: "", iscart: false };
    },
  },
});
const { actions, reducer } = CartSlice;

export const {
  AddCart,
  IncreaseCartQty,
  DecreaseCartQty,
  RemoveCart,
  ClearCartProduct,
} = actions;
export default reducer;
