import { baseApi } from "./api/baseApi";
import themeReducer  from "@/lib/themeSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  themeToggle: themeReducer, 
};
