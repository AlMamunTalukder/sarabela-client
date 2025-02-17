// import { createSlice } from "@reduxjs/toolkit";

// const isDarkMode = typeof window !== "undefined" 
//   ? localStorage.getItem("theme") === "dark" 
//   : false;

// const themeSlice = createSlice({
//   name: "theme",
//   initialState: { mode: isDarkMode },
//   reducers: {
//     toggleDarkMode: (state) => {
//       state.mode = !state.mode;
//       localStorage.setItem("theme", state.mode ? "dark" : "light");
//       document.documentElement.classList.toggle("dark", state.mode);
//     },
//   },
// });

// export const { toggleDarkMode } = themeSlice.actions;
// export default themeSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") === "dark";
  }
  return false; // Default mode (light)
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: getInitialTheme() },
  reducers: {
    toggleDarkMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("theme", state.mode ? "dark" : "light");

      // Apply dark mode class to <html>
      if (state.mode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
