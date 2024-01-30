import { RequestStatus } from "../store.types";
import { User } from "./auth.types";

export class AuthStore {
  loginStatus: RequestStatus = "idle";
  signUpStatus: RequestStatus = "idle";
  accessToken = "";
  user?: User;
  fetchUserStatus: RequestStatus = "idle";
}
