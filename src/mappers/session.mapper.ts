export function toSession(session: any) {
  return {
    sessionId: session.id,
    title: session.title,
    createdAt: session.created_at,
    updatedAt: session.updated_at,
  };
}
