import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mainBodyColor: '#ffffff',
    outerBodyColor: 'linear-gradient(270deg, #F51275 0%, #622098 100%)',
    fontColor: "#ffffff",
    btnColor: 'linear-gradient(270deg, #F51275 0%, #622098 100%)'
  });

  const updateTheme = (newTheme) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...newTheme,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
