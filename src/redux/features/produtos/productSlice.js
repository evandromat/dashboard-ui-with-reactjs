import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  isLoggedInProduct: false,
  isErrorProduct: false,
  isSuccessProduct: false,
  isLoadingProduct: false,
  messageProduct: "",
  product: [],
};
//register User
// export const register = createAsyncThunk(
//   "/register",
//   async (userData, trunkAPI) => {
//     try {
//       return await productService.register(userData);
//     } catch (error) {
//       const messageProduct =
//         (error.response &&
//           error.response.data &&
//           error.response.data.messageProduct) ||
//         error.toString();
//       return trunkAPI.rejectWithValue(messageProduct);
//     }
//   }
// );
// //Login User
// export const login = createAsyncThunk("/login", async (userData, trunkAPI) => {
//   try {
//     return await productService.login(userData);
//   } catch (error) {
//     const messageProduct =
//       (error.response && error.response.data && error.response.data.messageProduct) ||
//       error.toString();
//     return trunkAPI.rejectWithValue(messageProduct);
//   }
// });
// //Logout User
// export const logout = createAsyncThunk("/logout", async (_, trunkAPI) => {
//   try {
//     return await productService.logout();
//   } catch (error) {
//     const messageProduct =
//       (error.response && error.response.data && error.response.data.messageProduct) ||
//       error.toString();
//     return trunkAPI.rejectWithValue(messageProduct);
//   }
// });
// //getStatus
// export const getLoginStatus = createAsyncThunk(
//   "/getLoginStatus",
//   async (_, trunkAPI) => {
//     try {
//       return await productService.getLoginStatus();
//     } catch (error) {
//       const messageProduct =
//         (error.response &&
//           error.response.data &&
//           error.response.data.messageProduct) ||
//         error.toString();
//       return trunkAPI.rejectWithValue(messageProduct);
//     }
//   }
// );
//getProducts
export const getProducts = createAsyncThunk(
  "/getProducts",
  async (_, trunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const messageProduct =
        (error.response &&
          error.response.data &&
          error.response.data.messageProduct) ||
        error.toString();
      return trunkAPI.rejectWithValue(messageProduct);
    }
  }
);
// //updateUser
// export const updateUser = createAsyncThunk(
//   "/updateUser",
//   async (userData, trunkAPI) => {
//     try {
//       return await productService.updateUser(userData);
//     } catch (error) {
//       const messageProduct =
//         (error.response &&
//           error.response.data &&
//           error.response.data.messageProduct) ||
//         error.toString();
//       return trunkAPI.rejectWithValue(messageProduct);
//     }
//   }
// );
// //updatPhoto
// export const updatePhoto = createAsyncThunk(
//   "/updatePhoto",
//   async (userData, trunkAPI) => {
//     try {
//       return await productService.updatePhoto(userData);
//     } catch (error) {
//       const messageProduct =
//         (error.response &&
//           error.response.data &&
//           error.response.data.messageProduct) ||
//         error.toString();
//       return trunkAPI.rejectWithValue(messageProduct);
//     }
//   }
// );
// cadastro de produto
export const cadProduto = createAsyncThunk(
  "/cad-produto",
  async (productData, trunkAPI) => {
    try {
      return await productService.cadProduto(productData);
    } catch (error) {
      const messageProduct =
        (error.response &&
          error.response.data &&
          error.response.data.messageProduct) ||
        error.toString();
      return trunkAPI.rejectWithValue(messageProduct);
    }
  }
);
//getSingleProduct
export const getSingleProduct = createAsyncThunk("/", async (id, trunkAPI) => {
  try {
    return await productService.getSingleProduct(id);
  } catch (error) {
    const messageProduct =
      (error.response && error.response.data && error.response.data.messageProduct) ||
      error.toString();
    return trunkAPI.rejectWithValue(messageProduct);
  }
});
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isErrorProduct = false;
      state.isSuccessProduct = false;
      state.isLoadingProduct = false;
      state.messageProduct = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // cadastro de produto
      .addCase(cadProduto.pending, (state) => {
        state.isLoadingProduct = true;
      })
      .addCase(cadProduto.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.isSuccessProduct = true;
        // state.isLoggedInProduct = true;
        state.product = action.payload;
        toast.success("Produto cadastrado com sucesso...");
      })
      .addCase(cadProduto.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.isErrorProduct = true;
        state.messageProduct = action.payload;
        state.product = [];
        toast.success(action.payload);
      })
      // Buscar produto
      .addCase(getProducts.pending, (state) => {
        state.isLoadingProduct = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.isSuccessProduct = true;
        state.isLoggedInProduct = true;
        state.product = action.payload

      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.isErrorProduct = true;
        state.messageProduct = action.payload;
        toast.error(action.payload)
      })
  },
});

export const { RESET_AUTH } = productSlice.actions;

export default productSlice.reducer;
