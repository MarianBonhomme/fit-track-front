import { createContext, useContext, useEffect, useState } from "react";
import { signin, signup, getUserById } from "./UserService"
import { getAvatarById } from "../avatar/AvatarService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = localStorage.getItem('user')
  const [user, setUser] = useState(storedUser)
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    if (storedUser) {
      fetchUser();
    }
  }, [])

  useEffect(() => {
    console.log(user)
    if (user && user.avatar_id) {
      fetchUserAvatar();
    }
  }, [user])

  const fetchUser = async () => {
    const userFetched = await getUserById(storedUser);
    setUser(userFetched)
  }

  const fetchUserAvatar = async () => {
    const fetchedUserAvatar = await getAvatarById(user.avatar_id)
    setUserAvatar(fetchedUserAvatar);
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

  return (
    <UserContext.Provider
      value={{
        user,
        userAvatar,
        handleSignin,
        handleSignup,
        handleSignout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext);
}