import { createContext, useContext, useEffect, useState } from "react";
import { getAvatars, getAvatarById, addAvatar } from "../profile/AvatarService";
import { lightColors } from './../../assets/colors/lightColors';
import { darkColors } from './../../assets/colors/darkColors';
import { getColorById, getColors } from "../profile/ColorService";
import { useUser } from "../user/UserContext";
import { getProfileById, getProfilesByUserId, updateProfile } from "./ProfileService";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useUser();
  const [userProfiles, setUserProfiles] = useState(null);
  const storedProfile = localStorage.getItem('profile')
  const [profile, setProfile] = useState(storedProfile)
  const [avatars, setAvatars] = useState([]);
  const [colors, setColors] = useState([]);
  const [profileAvatar, setProfileAvatar] = useState(null);
  const [profileColor, setProfileColor] = useState(null);

  const storedTheme = localStorage.getItem('theme')
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === 'true');
  const [themeColors, setThemeColors] = useState(isDarkMode ? darkColors : lightColors);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserProfiles();
      if (storedProfile) {
        await fetchProfile(storedProfile)
      }
      await fetchAvatars();
      await fetchColors();
    };
  
    fetchData();
  }, [])

  useEffect(() => {
    if (profile) {
      setIsDarkMode(profile.dark_theme);
    }
    if (profile && profile.avatar_id) {
      fetchProfileAvatar();
    }
    if (profile && profile.color_id) {
      fetchProfileColor();
    }
  }, [profile])
  
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    const updatedColors = isDarkMode ? darkColors : lightColors;
    setThemeColors(updatedColors);
    localStorage.setItem('theme', isDarkMode)
  }, [isDarkMode]);

  const toggleDarkMode = async () => {
    const profileToUpdate = {
      ...profile,
      dark_theme: !isDarkMode,
    }
    try {
      const updatedProfile = await updateProfile(profileToUpdate);
      setProfile(updatedProfile)
    } catch (error) {
      console.error(`Error updating profile with id ${profileToUpdate.id}:`, error);
    }
  };

  const fetchUserProfiles = async () => {
    const fetchedUserrofiles = await getProfilesByUserId(user.id);
    setUserProfiles(fetchedUserrofiles)
  }

  const fetchProfile = async () => {
    const fetchedProfile = await getProfileById(storedProfile);
    setProfile(fetchedProfile)
  }

  const fetchAvatars = async () => {
    const fetchedAvatars = await getAvatars();
    setAvatars(fetchedAvatars)
  }  

  const fetchProfileAvatar = async () => {
    const fetchedProfileAvatar = await getAvatarById(profile.avatar_id)
    setProfileAvatar(fetchedProfileAvatar);
  }

  const fetchColors = async () => {
    const fetchedColors = await getColors();
    setColors(fetchedColors)
  }  

  const fetchProfileColor = async () => {
    const fetchedProfileColor = await getColorById(profile.color_id ?? 0)
    setProfileColor(fetchedProfileColor);
  }

  const handleAddAvatar = async (newAvatar) => {
    try {
      const addedAvatar = await addAvatar(newAvatar);
      setAvatars((prevAvatars) => [...prevAvatars, addedAvatar]);
    } catch (error) {
      console.error('Error adding avatar:', error);
    }
  };

  const handleUpdateProfile = async (profileToUpdate) => {
    try {
      const updatedProfile = await updateProfile(profileToUpdate);
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        userProfiles,
        profile,
        avatars,
        colors,
        profileAvatar,
        profileColor,
        handleAddAvatar,
        handleUpdateProfile,
        isDarkMode, 
        themeColors,
        toggleDarkMode 
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  return useContext(ProfileContext);
}