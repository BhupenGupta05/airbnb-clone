import {createContext, useEffect, useState} from "react"
import axios from "axios"

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = window.localStorage.getItem("token");
  
      try {
        if (storedToken) {
          const response = await axios.get("/profile", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUser(response.data);

        } else {
          setUser(null);
  
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        setUser(null);
  
        if (error.response && error.response.status === 401) {
          // Token might be expired
          console.log("Token expired. Logging out.");
          window.localStorage.removeItem("token");
          setUser(null);
          // Redirect to login page or show a message to prompt the user to log in again
          // Example using React Router: history.push('/login');
        }
      } finally {
        setReady(true);
      }
    };

    fetchProfile()
  }, [])

  

  return (
    <UserContext.Provider value={{user, setUser, ready, setReady}}>
      {children}
    </UserContext.Provider>
  );
}