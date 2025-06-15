import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const slice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleItem: (state, action) => {
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemExists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export default slice.reducer;
