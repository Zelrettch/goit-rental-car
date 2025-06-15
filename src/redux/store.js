import { configureStore } from "@reduxjs/toolkit";
import catalogRedicer from "./catalog/slice";
import favouritesReducer from "./favourites/slice";

export const store = configureStore({
  reducer: {
    catalog: catalogRedicer,
    favourites: favouritesReducer,
  },
});
