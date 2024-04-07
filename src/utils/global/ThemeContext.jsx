import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const lightColors = {
  primary: '#F5F5F5',
  lightPrimary: '#E9ECF5',
  secondary: '#202124',
  red: '#EE6C6C',
  yellow: '#F6D963',
  orange: '#F4B570',
  green: '#42C697',
  blue: '#069ECF',
  purple: '#906FB4',
  gray: '#AAAAAF',
}

const darkColors = {
  primary: '#202124',
  lightPrimary: '#0E1013',
  secondary: '#F5F5F5',
  red: '#F48282',
  yellow: '#FEECA0',
  orange: '#FBCAA1',
  green: '#8CE0D1',
  blue: '#7CCAED',
  purple: '#A283C6',
  gray: '#5A5B63',
}

export const ThemeProvider = ({ children }) => {
  const storedDarkMode = localStorage.getItem('darkMode');
  const [isDarkMode, setIsDarkMode] = useState(storedDarkMode === 'true');
  const [colors, setColors] = useState(isDarkMode ? darkColors : lightColors);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDarkMode.toString());

    const updatedColors = isDarkMode ? darkColors : lightColors;
    setColors(updatedColors);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        colors,
        toggleDarkMode 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);