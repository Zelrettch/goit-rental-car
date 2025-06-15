import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/swagger-api.js";
import { setPage} from "./actions.js";

export const fetchCatalog = createAsyncThunk(
  "catalog/fetchCatalog",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setPage(payload.page || 1));
    const params = thunkAPI.getState().catalog.searchParams;
    try {
      const response = await api.get("/cars", {
        params: {
          brand: params.brand,
          rentalPrice: params.price,
          minMileage: params.mileageFrom,
          maxMileage: params.mileageTo,
          page: payload.page || 1,
        },
        signal: payload.signal,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
