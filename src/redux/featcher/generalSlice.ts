// src/redux/slices/cartSlice.ts

import { createSlice } from "@reduxjs/toolkit";

// Example cart product type
export interface tGeneral {
  drawerOpen: boolean;
}

const initialState: tGeneral = {
  drawerOpen: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    taugleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
  },
});

export const { taugleDrawer } = generalSlice.actions;

export default generalSlice.reducer;
