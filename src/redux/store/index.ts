import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api";
import searchReducer from "../featcher/searchSlice";
import cartReducer from "../featcher/CartSlice";
import generalReducer from "../featcher/generalSlice";

const store = configureStore({
  reducer: {
    searchParams: searchReducer,
    cartProduct: cartReducer,
    general: generalReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
