import { createTheme } from "@rneui/themed";

export const lightTheme = createTheme({
    mode: "light",
    colors: {
      primary: "#007bff",
      background: "#ffffff",
      text: "#000000",
      buttonBackground: "#007bff",
      buttonText: "#ffffff",
    },
});

export const darkTheme = createTheme({
    mode: "dark",
    colors: {
      primary: "#1e1e1e",
      background: "#000000",
      text: "#ffffff",
      buttonBackground: "#444444",
      buttonText: "#ffffff",
    },
  });