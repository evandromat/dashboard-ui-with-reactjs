import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const initialState = {
  isLoggedInAuth: false,
  user: null,
  isErrorAuth: false,
  isSuccessAuth: false,
  isLoadingAuth: false,
  messageAuth : ""
};
//register User
export const register = createAsyncThunk(
  "/register-admin",
  async (userData, trunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const messageAuth =
        (error.response &&
          error.response.data &&
          error.response.data.messageAuth) ||
        error.toString();
      return trunkAPI.rejectWithValue(messageAuth);
    }
  }
);
//Login User
export const login = createAsyncThunk("/login-admin", async (userData, trunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    const messageAuth =
      (error.response && error.response.data && error.response.data.messageAuth) ||
      error.toString();
    return trunkAPI.rejectWithValue(messageAuth);
  }
});
//Logout User
export const logout = createAsyncThunk("/logout-admin", async (_, trunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const messageAuth =
      (error.response && error.response.data && error.response.data.messageAuth) ||
      error.toString();
    return trunkAPI.rejectWithValue(messageAuth);
  }
});
//getStatus
export const getLoginStatus = createAsyncThunk(
  "/getLoginStatus",
  async (_, trunkAPI) => {
    try {
      return await authService.getLoginStatus();
    } catch (error) {
      const messageAuth =
        (error.response &&
          error.response.data &&
          error.response.data.messageAuth) ||
        error.toString();
      return trunkAPI.rejectWithValue(messageAuth);
    }
  }
);
//getUser
export const getAdmin = createAsyncThunk(
  "/getAdmin",
  async (token, trunkAPI) => {
    try {
      return await authService.getAdmin(token);
    } catch (error) {
      const messageAuth =
        (error.response &&
          error.response.data &&
          error.response.data.messageAuth) ||
        error.toString();
      return trunkAPI.rejectWithValue(messageAuth);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isErrorAuth = false;
      state.isSuccessAuth = false;
      state.isLoadingAuth = false;
      state.messageAuth = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //cadastrar user
      .addCase(register.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isSuccessAuth = true;
        state.isLoggedInAuth = true;
        state.user = action.payload;
        toast.success("Cadastro realizado...");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.messageAuth = action.payload;
        state.user = null;
        toast.success(action.payload);
      })
      //loginUser
      .addCase(login.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isSuccessAuth = true;
        state.isLoggedInAuth = true;
        state.user = action.payload;
        toast.success("Login realizado...");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.messageAuth = action.payload;
        state.user = null;
        toast.success(action.payload);
      })
      //Logout user
      .addCase(logout.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isSuccessAuth = true;
        state.isLoggedInAuth = false;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.messageAuth = action.payload;
        toast.success(action.payload);
      })
      //getLoginStatus
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isSuccessAuth = true;
        state.isLoggedInAuth = action.payload;
        if (action.payload.messageAuth === "invalid signature") {
          state.isLoggedInAuth = false;
        }
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.messageAuth = action.payload;
      })
      //getAdmin
      .addCase(getAdmin.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.isSuccessAuth = true;
        state.isLoggedInAuth = true;
        state.user = action.payload
        
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.isErrorAuth = true;
        state.messageAuth = action.payload;
        toast.error(action.payload)
      })
      
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
