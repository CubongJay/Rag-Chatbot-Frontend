import { Box, Typography } from "@mui/material";
import { AssistantTyping } from "./AssistantTyping";

import type { Session } from "../models/session";
import type { Message } from "../models/message";
import  { MessageType } from "../models/message";

type ChatWindowProps = {
    activeSession: Session | null;
    messages: Message[];
    isCreatingMessage: boolean;
}

export function ChatWindow({ activeSession, messages, isCreatingMessage }: ChatWindowProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        // p: 2,
        // overflowY: "auto",
        // bgcolor: "grey.50",
      }}
    >
        <Box sx={{ p:2, borderBottom: 1, borderColor: "divider"}}>
            <Typography variant="h6" sx={{ textAlign: 'center'}}>
                {activeSession? activeSession.title: 'No Session Selected'}
            </Typography>

    </Box>


      {/* Messages will live here */}


            {/* Messages area */}
            <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          bgcolor: "grey.50",
        }}
      >
        {/* messages will live here */}
        {messages.length === 0 ? (<Typography color="text.secondary">No messages</Typography>): (messages.map((msg, index)=> (
          <Box key={index} sx={{mb: 1.5, display: 'flex', justifyContent: msg.role === MessageType.USER ? 'flex-end': 'flex-start'}}>
            <Box sx={{ maxWidth: '70%', p: 1.5, borderRadius: 2, bgcolor: msg.role === MessageType.USER ? 'primary.main': 'grey.300', color: msg.role === MessageType.USER ? 'primary.contrastText': 'text.primary'}}>
              {msg.content}
            </Box>
          </Box>

          
        )))}

        {isCreatingMessage && <AssistantTyping />}
      </Box>

      {/* Input area */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        {/* input box */}
      </Box>
    </Box>


  );


}
