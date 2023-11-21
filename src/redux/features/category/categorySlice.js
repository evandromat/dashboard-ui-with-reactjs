import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryReduce from "./categoryReduce";
import { toast } from "react-toastify";

const initialState = {
  isSuccessCategory: false,
  isLoadingCategory: false,
  messageCategory:''
};
//register User
export const registerCategory = createAsyncThunk(
  "/register-product",
  async (userData, trunkAPI) => {
    try {
      return await categoryReduce.registerCategoria(userData);
    } catch (error) {
      const messageCategory =
        (error.response &&
          error.response.data &&
          error.response.data.messageCategory) ||
        error.toString();
      return trunkAPI.rejectWithValue(messageCategory);
    }
  }
);

//getCategory
export const getCategory = createAsyncThunk("/", async (_, trunkAPI) => {
  try {
    return await categoryReduce.getCategory();
  } catch (error) {
    const messageCategory =
      (error.response && error.response.data && error.response.data.messageCategory) ||
      error.toString();
    return trunkAPI.rejectWithValue(messageCategory);
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isSuccessCategory = false;
      state.isLoadingCategory = false;
      state.category = '';
      
  
    },
  },
  extraReducers: (builder) => {
    builder
      //cadastrar user
      .addCase(registerCategory.pending, (state) => {
        state.isLoadingCategory = true;
      })
      .addCase(registerCategory.fulfilled, (state, action) => {
        state.isLoadingCategory = false;
        state.isSuccessCategory = true;
        state.category = action.payload;
        state.allCategory = [...state.allCategory,action.payload]
        toast.success("Cadastro realizado...");
      })
      .addCase(registerCategory.rejected, (state, action) => {
        state.isLoadingCategory = false;
        state.category = action.payload;
        toast.error(action.payload);
      })
      //buscar categorias
      .addCase(getCategory.pending, (state) => {
        state.isLoadingCategory = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoadingCategory = false;
        state.isSuccessCategory = true;
        state.category = action.payload;
        state.allCategory=[...state.category]
       
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoadingCategory = false;
        state.category = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_AUTH } = categorySlice.actions;

export default categorySlice.reducer;
