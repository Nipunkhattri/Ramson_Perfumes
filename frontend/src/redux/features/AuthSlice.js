import { createSlice } from '@reduxjs/toolkit'
import * as api from '../api';
import { toast } from 'react-toastify'

const initialState = {
  isAuthenticated: false,
  token: undefined,
  error: null,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.data;
      state.error = null;
      state.loading = false;
    },
    loginFail(state, action) {
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    Logout(state, action) {
      state.isAuthenticated = false;
      state.token = undefined;
      state.error = null;
      state.loading = false;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  RegisterEnd,
  RegisterFail,
  RegisterSuccess,
  RegisterStart,
  Logout
} = authSlice.actions;

export const { reducer: authReducer } = authSlice;

const loginDispatcher = (data) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await api.login(data);
    console.log(response)
    if (response.data.token && response.status == 200) {
      localStorage.setItem('token', response.data.token);
      const jsonString = JSON.stringify(response.data.data);
      localStorage.setItem('user', jsonString);
      dispatch(loginSuccess(response.data));
      return response;
    }
    dispatch(RegisterEnd());
  } catch (error) {
    console.log(error);
    toast.error("Something is wrong");
    dispatch(loginFail("something went wrong"));
  }
}

const registerDispatcher = (register_credentials) => async (dispatch) => {
  try {
    const response = await api.register(register_credentials)
    if (response.status == 200) {
      toast.success("Registered successfully");
      return response;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something is wrong");
    dispatch(loginFail("something went wrong"));
  }
}

const checkPersistedLogin = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const retrievedString = localStorage.getItem('user');
  const data = JSON.parse(retrievedString);
  if (token && data) {
    dispatch(loginSuccess({ token,data }));
  }
}

export { loginDispatcher, registerDispatcher ,checkPersistedLogin };
export default authSlice.reducer