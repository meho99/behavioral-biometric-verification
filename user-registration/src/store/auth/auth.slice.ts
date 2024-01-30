import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionsType } from "../store.types";
import { AuthStore } from "./auth.state";
import { LoginPayload, SignUpPayload, User } from "./auth.types";
import { StoreKeys } from "../store.const";

const initialState = { ...new AuthStore() };

export const authSlice = createSlice({
  name: StoreKeys.Auth,
  initialState,
  reducers: {
    signOut: () => {
      return {
        ...new AuthStore(),
      };
    },

    login: (state, _: PayloadAction<LoginPayload>) => {
      state.loginStatus = "loading";
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loginStatus = "success";
      state.accessToken = action.payload;
    },
    loginError: (state) => {
      state.loginStatus = "error";
    },

    signUp: (state, _: PayloadAction<SignUpPayload>) => {
      state.signUpStatus = "loading";
    },
    signUpSuccess: (state, action: PayloadAction<string>) => {
      state.signUpStatus = "success";
      state.accessToken = action.payload;
    },
    signUpError: (state) => {
      state.signUpStatus = "error";
    },

    fetchUser: (state) => {
      state.fetchUserStatus = "loading";
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.fetchUserStatus = "success";
      state.user = action.payload;
    },
    fetchUserError: (state) => {
      state.fetchUserStatus = "error";
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

const { actions: authActions, reducer: authReducer } = authSlice;
export { authActions, authReducer };

export type AuthActions = ActionsType<typeof authActions>;
