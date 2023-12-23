import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "true";

    setIsDark(isDark);
  }, []);

  return (
    <ThemeContext.Provider value={[{ isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
