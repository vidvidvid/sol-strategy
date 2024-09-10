import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const getUserByPublicKey = async (publicKey: string) => {
  const response = await axios.get(`${API_URL}/users/${publicKey}`);
  return response.data;
};

export const updateUser = async (publicKey: string, userData: any) => {
  const response = await axios.put(`${API_URL}/users/${publicKey}`, userData);
  return response.data;
};
