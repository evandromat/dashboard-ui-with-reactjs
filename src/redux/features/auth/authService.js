import axios from "axios";


const BACKEND_URL = 'http://127.0.0.1:5000'

export const API_URL = `${BACKEND_URL}/api/admin/`;
// export const API_URL_P = `${BACKEND_URL}/api/product/`;

// Register User
const register = async (userData) => {
  const res = await axios.post(API_URL + "register-admin", userData);
  return res.data;
};

// login User
const login = async (userData) => {
  const res = await axios.post(API_URL + "login-admin", userData);
  const token = res.data.token;
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user",JSON.stringify( res.data));
  // console.log(res.data)
  return res.data;
};
// logout User
const logout = async () => {
  const res = await axios.get(API_URL + "logout-admin");

  sessionStorage.removeItem("token");
  return res.data.message;
};
// get login status
const getLoginStatus = async () => {
  const res = await axios.get(API_URL + "getLoginStatus");
  return res.data;
};
// get user
const getAdmin = async (token) => {
  axios.interceptors.response.use(
    (axios.defaults.headers.common["Authorization"] = "Bearer " + token)
  );
  if (token !== "undefined") {
    const res = await axios.get(API_URL + "getAdmin");
    return res.data;
  }
};
// update profile

const autService = {
  register,
  login,
  logout,
  getLoginStatus,
  getAdmin,
};
export default autService;
