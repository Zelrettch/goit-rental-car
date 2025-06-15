import { createSlice } from "@reduxjs/toolkit";
import { fetchCatalog } from "./operations.js";
import toast from "react-hot-toast";

const initialState = {
  items: [],
  searchParams: {
    brand: null,
    price: null,
    mileageFrom: null,
    mileageTo: null,
  },
  hasNext: false,
  page: 1,
};

const slice = createSlice({
  name: "catalog",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.items.push(...action.payload.cars);
        state.hasNext = action.payload.page < action.payload.totalPages;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to fetch catalog");
      });
  },
  reducers: {
    setParams: (state, action) => {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      };
    },
    clearItems: (state) => {
      state.items = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default slice.reducer;
