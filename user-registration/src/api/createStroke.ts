import axios from "axios";
import { MousePositionEvent } from "../store/mouseEvents/mouseEvents.types";

export type CreateStrokeRequest = {
  email: string;
  events: MousePositionEvent[];
};

export type CreateStrokeResponse = {
  status: string;
  message: string;
};

export const createStroke = async (
  dto: CreateStrokeRequest
): Promise<CreateStrokeResponse> => {
  const response = await axios.post<CreateStrokeResponse>(
    "http://127.0.0.1:5000/strokes",
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
