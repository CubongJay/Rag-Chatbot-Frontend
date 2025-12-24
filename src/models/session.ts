export type UUID = string;

export interface Session {
  sessionId: UUID;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSessionRequest {
  title?: string;
}

export interface CreateSessionResponse extends Session {}
