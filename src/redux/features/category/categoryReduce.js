import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:5000";
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/category`;

// cadastrar categoria
export const registerCategory = async (userData) => {
  const res = await axios.post(API_URL, { category: userData });
  return res.data;
};

// get user
export const getCategory = async () => {
  const res = await axios.get(API_URL);

  return res.data;
};

const categoryReduce = {
  // registerCategoria,
  // getCategory
};
export default categoryReduce;
