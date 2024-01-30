import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store.config";

const selectAuth = (state: RootState) => state.auth;

export const userSelector = createSelector(selectAuth, (auth) => auth.user);
export const fetchUserStatusSelector = createSelector(
  selectAuth,
  (auth) => auth.fetchUserStatus
);
export const isUserLoadingSelector = createSelector(
  fetchUserStatusSelector,
  userSelector,
  (fetchUserStatus, user) => !user && fetchUserStatus === "loading"
);

export const accessTokenSelector = createSelector(
  selectAuth,
  (auth) => auth.accessToken
);

export const signUpStatusSelector = createSelector(
  selectAuth,
  (auth) => auth.signUpStatus
);

export const loginStatusSelector = createSelector(
  selectAuth,
  (auth) => auth.loginStatus
);
