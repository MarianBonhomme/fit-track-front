import { createContext, useContext, useState } from "react";
import { signin, signup } from "./UserService"

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = localStorage.getItem('user')
  const [user, setUser] = useState(storedUser)

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