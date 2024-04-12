import { createContext, useContext, useEffect, useState } from "react";
import { signin, signup, getUserById, updateUser } from "./UserService"

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(true)
  const storedUser = localStorage.getItem('user')
  const [user, setUser] = useState(storedUser)

  useEffect(() => {
    const fetchData = async () => {
      if (storedUser) {
        await fetchUser();
      }
      setUserLoading(false);
    };
  
    fetchData();
  }, [])

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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext);
}