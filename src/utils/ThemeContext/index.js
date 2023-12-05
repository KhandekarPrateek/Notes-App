import { createContext, useEffect, useState } from "react";

const themes = {
  dark: {
    backgroundColor: "#202124",
    color: "white",
  },
  light: {
    backgroundColor: "white",
    color: "black",
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;
  const toggleTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };
  console.log(isDark);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "true";
    console.log(isDark, "useEffect");
    setIsDark(isDark);
  }, []);
  const foo = localStorage.getItem("isDark");
  console.log(foo, "local storage");
  console.log(isDark, "dark");
  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
