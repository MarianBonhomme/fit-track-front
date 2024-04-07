import { createContext, useContext, useEffect, useState } from "react";
import { addAvatar, getAvatars } from "./AvatarService";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    fetchAvatars();
  }, [])

  const fetchAvatars = async () => {
    const fetchedAvatars = await getAvatars();
    setAvatars(fetchedAvatars)
  }  

  const handleAddAvatar = async (newAvatar) => {
    try {
      const addedAvatar = await addAvatar(newAvatar);
      setAvatars((prevAvatars) => [...prevAvatars, addedAvatar]);
    } catch (error) {
      console.error('Error adding avatar:', error);
    }
  };

  return (
    <AvatarContext.Provider
      value={{
        avatars,
        handleAddAvatar,
      }}
    >
      {children}
    </AvatarContext.Provider>
  )
}

export const useAvatar = () => {
  return useContext(AvatarContext);
}

