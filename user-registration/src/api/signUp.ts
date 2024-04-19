import axios from "axios";
import { LoginRequest, LoginResponse } from "./login";

export const signUp = async (dto: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "http://127.0.0.1:5000/user/signup",
    dto,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const text = response.data;
  return text;
};
