import {createContext, useEffect, useState} from "react"
import axios from "axios"

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/profile');
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && children}
    </UserContext.Provider>
  );
}