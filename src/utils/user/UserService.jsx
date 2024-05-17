import axios from 'axios';
import { environment } from '../../../environment';

const BASE_URL = environment.API_URL || "http://localhost:3000";

const pingServer = async () => {
  try {
    await axios.get(`${BASE_URL}`);
    console.log('Ping réussi');
  } catch (error) {
    console.error('Error ping:', error);
  }
};

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

const updateUser = async (userToUpdate) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/${userToUpdate.id}`, userToUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${userToUpdate.id}:`, error);
    throw error;
  }
};

export { pingServer, signin, signup, getUserById, updateUser };