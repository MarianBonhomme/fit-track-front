import { createContext, useContext, useEffect, useState } from "react";
import { getAvatars, getAvatarById, addAvatar } from "../profile/AvatarService";
import { getColorById, getColors } from "../profile/ColorService";
import { useUser } from "../user/UserContext";
import { getProfileById, getProfilesByUserId, updateProfile } from "./ProfileService";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileLoading, setProfileLoading] = useState(true)
  const { user, userLoading } = useUser();
  const [userProfiles, setUserProfiles] = useState(null);
  const [profile, setProfile] = useState()
  const [avatars, setAvatars] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProfiles = await fetchUserProfiles();
        if (fetchedProfiles && fetchedProfiles.length > 0) {
          setProfile(fetchedProfiles[0]);
        }
        await fetchAvatars();
        await fetchColors();
      } catch (error) {
        
      } finally {
        setProfileLoading(false);
      }
    };
  
    if (!userLoading && user && user.id) {
      fetchData();
    }
  }, [user])

  const switchProfile = async (profile) => {
    fetchProfile(profile.id);
  }

  const fetchUserProfiles = async () => {
    try {
      const fetchedUserProfiles = await getProfilesByUserId(user.id);
      setUserProfiles(fetchedUserProfiles);
      return fetchedUserProfiles;
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      throw error;
    }
  }

  const fetchProfile = async (profileId) => {
    const fetchedProfile = await getProfileById(profileId);
    setProfile(fetchedProfile)
  }

  const fetchAvatars = async () => {
    const fetchedAvatars = await getAvatars();
    setAvatars(fetchedAvatars)
  }  

  const fetchColors = async () => {
    const fetchedColors = await getColors();
    setColors(fetchedColors)
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
      setUserProfiles((prevUserProfiles) => 
        prevUserProfiles.map((userProfile) =>
          updatedProfile.id === userProfile.id ? updatedProfile : userProfile
        )
      )
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