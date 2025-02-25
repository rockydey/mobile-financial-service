import { configureStore } from "@reduxjs/toolkit";
import { API } from "../API/API";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice } from "../slice/auth/auth-slice";

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    auth: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100,
      },
    }).concat(API.middleware),
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
