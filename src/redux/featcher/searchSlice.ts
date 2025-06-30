import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  price: { max: number; min: number };
  brandIds: string[];
  categoryIds: string[];
  searchTerm: string;
  offerTypes: string[];
}

const initialState: FilterState = {
  price: { max: 30000, min: 10 },
  brandIds: [],
  categoryIds: [],
  searchTerm: "",
  offerTypes: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.price = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.price.max = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.price.min = action.payload;
    },
    setBrandIds(state, action: PayloadAction<string[]>) {
      state.brandIds = action.payload;
    },
    toggleBrandId(state, action: PayloadAction<string>) {
      const id = action.payload;
     
        
      if (state.brandIds.includes(id)) {
        state.brandIds = state.brandIds.filter((bid) => bid !== id);
      } else {
        state.brandIds.push(id);
      }
    },
    setCategoryIds(state, action: PayloadAction<string[]>) {
      state.categoryIds = action.payload;
    },
    toggleCategoryId(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.categoryIds.includes(id)) {
        state.categoryIds = state.categoryIds.filter((cid) => cid !== id);
      } else {
        state.categoryIds.push(id);
      }
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setOfferTypes(state, action: PayloadAction<string[]>) {
      state.offerTypes = action.payload;
    },
    toggleOfferType(state, action: PayloadAction<string>) {
      const offer = action.payload;
      if (state.offerTypes.includes(offer)) {
        state.offerTypes = state.offerTypes.filter((o) => o !== offer);
      } else {
        state.offerTypes.push(offer);
      }
    },
    resetFilters(state) {
      state.price = { min: 0, max: 0 };
      state.brandIds = [];
      state.categoryIds = [];
      state.searchTerm = "";
      state.offerTypes = [];
    },
  },
});

export const {
  setPriceRange,
  setBrandIds,
  toggleBrandId,
  setCategoryIds,
  toggleCategoryId,
  setSearchTerm,
  setOfferTypes,
  toggleOfferType,
  resetFilters,
  setMaxPrice,
  setMinPrice,
} = filterSlice.actions;

export default filterSlice.reducer;
