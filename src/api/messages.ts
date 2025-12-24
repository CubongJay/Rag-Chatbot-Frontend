import axios from "axios";
import { axiosClient } from "./axiosClient";
import type {
  CreateMessageRequest,
  MessagePairResponse,
} from "../models/message";
import { toMessagePairResponse } from "../mappers/message.mapper";

export async function createMessageApi(
  sessionId: string,
  request: CreateMessageRequest
): Promise<MessagePairResponse> {
  try {
    const response = await axiosClient.post<MessagePairResponse>(
      `/sessions/${sessionId}/messages/`,
      request
    );
    return toMessagePairResponse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("Failed to create message");
  }
}

export async function getMessagesApi(
  sessionId: string
): Promise<MessagePairResponse> {
  try {
    const response = await axiosClient.get<MessagePairResponse>(
      `/sessions/${sessionId}/messages/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("Failed to get messages");
  }
}
