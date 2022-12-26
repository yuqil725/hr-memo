import Reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: Reducer, devTools: true });

export default store;

export type RootState = ReturnType<typeof store.getState>;
