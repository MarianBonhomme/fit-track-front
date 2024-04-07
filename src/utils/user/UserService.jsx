import axios from 'axios';

const BASE_URL = "http://localhost:3000";

const signin = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signin`, user)
    return response.data
  } catch (error) {
    console.error("Error signin:", error)
    throw error;
  }
}

const signup = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, user)
    return response.data
  } catch (error) {
    console.error("Error signup:", error)
    throw error;
  }
}

const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`)
    return response.data
  } catch (error) {
    console.error("Error signin:", error)
    throw error;
  }
}

export { signin, signup, getUserById };