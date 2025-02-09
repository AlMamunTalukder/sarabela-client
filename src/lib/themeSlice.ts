import { createSlice } from "@reduxjs/toolkit";

const isDarkMode = typeof window !== "undefined" 
  ? localStorage.getItem("theme") === "dark" 
  : false;

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: isDarkMode },
  reducers: {
    toggleDarkMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("theme", state.mode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", state.mode);
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
