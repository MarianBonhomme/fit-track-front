import { createContext, useContext, useEffect, useState } from "react";
import { signin, signup, getUserById } from "./UserService"

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = localStorage.getItem('user')
  const [user, setUser] = useState(storedUser)

  useEffect(() => {
    if(storedUser) {
      fetchUser();
    }
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

  return (
    <UserContext.Provider
      value={{
        user,
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