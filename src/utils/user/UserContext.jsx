import { createContext, useContext, useEffect, useState } from "react";
import { signin, signup, getUserById, updateUser } from "./UserService"
import { getAvatars, getAvatarById, addAvatar } from "./AvatarService";
import { lightColors } from './../../assets/colors/lightColors';
import { darkColors } from './../../assets/colors/darkColors';
import { getColorById, getColors } from "./ColorService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(true)
  const storedUser = localStorage.getItem('user')
  const [user, setUser] = useState(storedUser)
  const [avatars, setAvatars] = useState([]);
  const [colors, setColors] = useState([]);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userColor, setUserColor] = useState(null);

  const storedTheme = localStorage.getItem('theme')
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === 'true');
  const [themeColors, setThemeColors] = useState(isDarkMode ? darkColors : lightColors);

  useEffect(() => {
    const fetchData = async () => {
      if (storedUser) {
        await fetchUser();
      }
      await fetchAvatars();
      await fetchColors();
      setUserLoading(false);
    };
  
    fetchData();
  }, [])

  useEffect(() => {
    if (user) {
      setIsDarkMode(user.dark_theme);
    }
    if (user && user.avatar_id) {
      fetchUserAvatar();
    }
    if (user && user.color_id) {
      fetchUserColor();
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
      dark_theme: !isDarkMode,
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

  const fetchAvatars = async () => {
    const fetchedAvatars = await getAvatars();
    setAvatars(fetchedAvatars)
  }  

  const fetchUserAvatar = async () => {
    const fetchedUserAvatar = await getAvatarById(user.avatar_id)
    setUserAvatar(fetchedUserAvatar);
  }

  const fetchColors = async () => {
    const fetchedColors = await getColors();
    setColors(fetchedColors)
  }  

  const fetchUserColor = async () => {
    const fetchedUserColor = await getColorById(user.color_id ?? 0)
    setUserColor(fetchedUserColor);
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

  const handleAddAvatar = async (newAvatar) => {
    try {
      const addedAvatar = await addAvatar(newAvatar);
      setAvatars((prevAvatars) => [...prevAvatars, addedAvatar]);
    } catch (error) {
      console.error('Error adding avatar:', error);
    }
  };

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
        avatars,
        colors,
        userAvatar,
        userColor,
        handleSignin,
        handleSignup,
        handleSignout,
        handleAddAvatar,
        handleUpdateUser,
        isDarkMode, 
        themeColors,
        toggleDarkMode 
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext);
}