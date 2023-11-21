import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/product/`;

// cadProduto User
export const cadProduto = async (productData) => {
  const res = await axios.post(API_URL + "cad-produto", productData);
  return res.data;
};
// get user
export const getProducts = async () => {
  const res = await axios.get(API_URL + "getProducts");

  return res.data;
};
export const upDateProduct = async(productData)=>{
  const res = await axios.patch(API_URL + 'upDateProduct',productData)
  return res.data
}

const autService = {
  //produto
  // cadProduto,
  // getProducts,
};
export default autService;
