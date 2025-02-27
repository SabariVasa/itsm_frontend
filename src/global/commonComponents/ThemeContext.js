import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mainBodyColor: '#ffffff',
    outerBodyColor: '#540c00',
    InnerBodyfontColor: '#540c00',
    outerBodyfontColor: '#ffffff',
    typeTextColor: 'gray',
    headerFontColor: "#540c00f",
    subHeaderFontColor: "#540c00f",
    btnColor: '#540c00',
    btnHoverColor: '#A17D34',
    borderColor: '#540c00',
    valueFontColor : '#540c00',
    tableFontColor:"white"
    // headerFontColor: ''
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
