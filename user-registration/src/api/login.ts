import axios from "axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: string;
  message: string;
  email: string;
};

export const login = async (dto: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "http://127.0.0.1:5000/login",
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
