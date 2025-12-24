import axios from "axios";
import { axiosClient } from "./axiosClient";
import type { Session, CreateSessionRequest } from "../models/session";
import { toSession } from "../mappers/session.mapper";
export async function createSessionApi(
  request: CreateSessionRequest
): Promise<Session> {
  try {
    const response = await axiosClient.post<Session>("/sessions/", request);

    return response.data;
  } catch (error) {
    // console.error(error);
    // throw new Error("Failed to create session");
    if (axios.isAxiosError(error)) {
      // Preserve more error context
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create session";
      const status = error.response?.status;
      console.error("Session creation failed:", { message, status, error });
      throw new Error(message);
    }
    throw new Error("Failed to create session");
  }
}

export async function getSessionsApi(): Promise<Session[]> {
  try {
    const response = await axiosClient.get<Session[]>("/sessions/");
    console.log(response.data.items);
    return response.data.items.map(toSession);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("Failed to get sessions");
  }
}
