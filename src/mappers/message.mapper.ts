export function toMessage(message: any) {
  return {
    id: message.id,
    sessionId: message.session_id,
    sender: message.sender,
    content: message.content,
    messageType: message.message_type,
    timestamp: message.timestamp,
    createdAt: message.created_at,
    updatedAt: message.updated_at,
  };
}

export function toMessagePairResponse(messagePairResponse: any) {
  return {
    userMessage: toMessage(messagePairResponse.user_message),
    assistantMessage: toMessage(messagePairResponse.assistant_message),
  };
}
