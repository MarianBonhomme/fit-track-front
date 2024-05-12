import { createContext, useContext, useEffect, useState } from "react";
import { getAvatars, getAvatarById, addAvatar } from "../profile/AvatarService";
import { getColorById, getColors } from "../profile/ColorService";
import { useUser } from "../user/UserContext";
import { getProfileById, getProfilesByUserId, updateProfile } from "./ProfileService";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileLoading, setProfileLoading] = useState(false)
  const { user } = useUser();
  const [userProfiles, setUserProfiles] = useState(null);
  const storedProfile = localStorage.getItem('profile')
  const [profile, setProfile] = useState()
  const [avatars, setAvatars] = useState([]);
  const [colors, setColors] = useState([]);
  const [profileAvatar, setProfileAvatar] = useState(null);
  const [profileColor, setProfileColor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setProfileLoading(true);
      await fetchUserProfiles();
      if (storedProfile) {
        fetchProfile(storedProfile)
      } else if (userProfiles && userProfiles.length > 0) {
        setProfile(userProfiles[0])
      }
      await fetchAvatars();
      await fetchColors();
      setProfileLoading(false);
    };
  
    if (user) {
      fetchData();
    }
  }, [user])

  useEffect(() => {
    if (profile && profile.id) {
      fetchUserProfiles();
    }
    if (profile && profile.avatar_id) {
      fetchProfileAvatar();
    }
    if (profile && profile.color_id) {
      fetchProfileColor();
    }
  }, [profile])

  const switchProfile = async (profile) => {
    fetchProfile(profile.id);
  }

  const fetchUserProfiles = async () => {
    const fetchedUserProfiles = await getProfilesByUserId(user.id);
    setUserProfiles(fetchedUserProfiles)
  }

  const fetchProfile = async (profileId) => {
    const fetchedProfile = await getProfileById(profileId);
    setProfile(fetchedProfile)
    localStorage.setItem('profile', fetchedProfile.id)
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
        profileLoading,
        userProfiles,
        profile,
        avatars,
        colors,
        profileAvatar,
        profileColor,
        handleAddAvatar,
        handleUpdateProfile,
        switchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  return useContext(ProfileContext);
}