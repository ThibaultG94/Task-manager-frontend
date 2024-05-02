import axios from "axios";

export const getAssignedUser = async (userId) => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const res = await axios.get(`${API_URL}/users/${userId}/account`, {
      withCredentials: true,
    });
    return res.data.user;
  } catch (error) {
    console.error("Error with getAssignedUser ", error);
  }
};
