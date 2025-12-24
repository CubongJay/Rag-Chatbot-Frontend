export type UUID = string;

export enum MessageType {
  USER = "user",
  ASSISTANT = "assistant",
}
export interface MessageResponse {
  id: UUID;
  sessionId: UUID;
  sender: string;
  content: string;
  messagType: MessageType;
  timestamp: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageRequest {
  sender: string;
  content: string;
  messageType: MessageType;
}

export interface MessagePairResponse {
  userMessage: MessageResponse;
  assistantMessage: MessageResponse;
}

export interface Message {
  role: string;
  content: string;
}
