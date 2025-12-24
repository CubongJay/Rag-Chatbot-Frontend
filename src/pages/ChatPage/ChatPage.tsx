
import { Box } from "@mui/material";
import { ChatWindow } from "../../components/ChatWindow";
import { useState, useEffect } from 'react';
import type { Session } from "../../models/session";
import type { Message } from "../../models/message";
import { GetSessions } from "../../components/sessions";

import { ChatInput } from "../../components/ChatInput";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useCreateSession } from "../../hooks/useCreateSession";
import { CreateSessionDialog } from "../../components/CreateSession";
import { useCreateMessage } from "../../hooks/useCreateMessage";

export function ChatPage() {





   const [activeSession, setActiveSession] = useState<Session | null>(null);
   const [messages, setMessages] = useState<Message[]>([]);
   const { isLoading, error, getAllMessages } = useGetMessages();
   const { createSession } = useCreateSession();
   const [dialogOpen, setDialogOpen] = useState(false);

   const { isLoading: isCreatingMessage, error: errorCreatingMessage, createMessage } = useCreateMessage();



   useEffect(() => {
    if (activeSession) {
      // getMessages(activeSession.id);
      async function fetchMessages() {
        const fetchedMessages = await getAllMessages(activeSession.sessionId);
        setMessages(fetchedMessages);
      }
      fetchMessages();
    }
   }, [activeSession]);


   function handleSelectSession(session: Session){
      setActiveSession(session);
   }
   function handleAddMessage(message: Message){
    setMessages((prevMessages) => [...prevMessages, message]);
   }

   async function handleCreateSession(title: string){
    const session = await createSession({ title })
    setActiveSession(session);
    setDialogOpen(false);


   }
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      
  
      <Box
        sx={{
          width: "22%", 
          minWidth: 240,
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <GetSessions activeSession={activeSession} onSelectSession={handleSelectSession}
         onCreateSession={() => setDialogOpen(true)}
         />
        <CreateSessionDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onCreate={handleCreateSession} />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow activeSession={activeSession} messages={messages} 
        isCreatingMessage={isCreatingMessage}/>
        <ChatInput 
        idSession={activeSession?.sessionId}
        onAddMessage={handleAddMessage}
        createMessage={createMessage}
        /> 
      </Box>
    </Box>
  );
}