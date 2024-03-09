import axios from "axios"

const fetchProfile = async () => {
    const storedToken = window.localStorage.getItem("token")

    try {
        if (storedToken) {
          const response = await axios.get("/profile", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        // Handle the error as needed, e.g., return null or throw the error
        return null;
      }
}


export default {fetchProfile}