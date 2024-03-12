import {createContext, useEffect, useState} from "react"
import profileService from './services/fetchProfile'

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchProfileAndSetUser = async () => {
      const response = await profileService.fetchProfile()
  
      try {
        if (response) {
            setUser(response);
        } else {
            setUser(null);
        }
    } catch (error) {
        console.error("Error setting user profile:", error.message);
        setUser(null);
    } finally {
        setReady(true);
    }
    };

    fetchProfileAndSetUser()
  }, [])

  

  return (
    <UserContext.Provider value={{user, setUser, ready, setReady}}>
      {children}
    </UserContext.Provider>
  );
}