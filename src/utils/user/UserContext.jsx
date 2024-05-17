import { createContext, useContext, useEffect, useState } from "react";
import { signin, signup, getUserById, updateUser, pingServer } from "./UserService"
import { darkColors } from './../../assets/colors/darkColors';
import { lightColors } from './../../assets/colors/lightColors';
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(true)
  const storedUser = localStorage.getItem('user')
  const [user, setUser] = useState(null)

  const storedTheme = localStorage.getItem('theme')
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === 'true');
  const [themeColors, setThemeColors] = useState(isDarkMode ? darkColors : lightColors);

  useEffect(() => {
    const pingInterval = setInterval(pingServer, 840000);
    
    return () => clearInterval(pingInterval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (storedUser) {
        await fetchUser();
      }
      setUserLoading(false);
    };
  
    fetchData();
  }, [])  

  useEffect(() => {
    if (user) {
      setIsDarkMode(user.dark_mode);
    }
  }, [user])

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    const updatedColors = isDarkMode ? darkColors : lightColors;
    setThemeColors(updatedColors);
    localStorage.setItem('theme', isDarkMode)
  }, [isDarkMode]);
  
  const toggleDarkMode = async () => {
    const userToUpdate = {
      ...user,
      dark_mode: !isDarkMode,
    }
    try {
      const updatedUser = await updateUser(userToUpdate);
      setUser(updatedUser)
    } catch (error) {
      console.error(`Error updating user with id ${userToUpdate.id}:`, error);
    }
  };

  const fetchUser = async () => {
    const userFetched = await getUserById(storedUser);
    setUser(userFetched)
  }

  const handleSignin = async (user) => {
    try {
      const loggedUser = await signin(user);
      setUser(loggedUser);
      localStorage.setItem('user', loggedUser.id);
    } catch (error) {
      console.error('Error signin', error)
    }
  }

  const handleSignup = async (user) => {
    try {
      const newUser = await signup(user);
      setUser(newUser);
      localStorage.setItem('user', newUser.id);
    } catch (error) {
      console.error('Error signup', error)
    }
  }
  
  const handleSignout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  const handleUpdateUser = async (userToUpdate) => {
    try {
      const updatedUser = await updateUser(userToUpdate);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        userLoading,
        user,
        handleSignin,
        handleSignup,
        handleSignout,
        handleUpdateUser,
        toggleDarkMode,
        isDarkMode,
        themeColors
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext);
}