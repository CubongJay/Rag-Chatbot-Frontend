import { Box, Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FileUpload } from "./fileUpload";
// import { useCreateMessage } from "../hooks/useCreateMessage";
import type { MessagePairResponse } from "../models/message";
import { useState } from "react";
import { MessageType } from "../models/message";
import type { CreateMessageRequest, Message } from "../models/message";
import type { UUID } from "../models/message";
type ChatInputProps = {
  idSession: UUID;
  onAddMessage: (message: Message) => void;
  createMessage: (sessionId: string, request: CreateMessageRequest) => Promise<MessagePairResponse>;
}


export function ChatInput({ idSession, onAddMessage, createMessage }: ChatInputProps) {

  const [inputText, setInputText] = useState<string>("");


  async function handleSendMessage() {
    if (inputText.trim() === "") return;

    onAddMessage({role: "user", content: inputText});
    setInputText("");


    try{
      const response = await createMessage(idSession, {
        sender: "user",
        content: inputText,
        messageType: MessageType.USER,
      });
      console.log("response from ChatInput");
      console.log("response", response);
      onAddMessage(response.assistantMessage);
    }
    catch(error){
      console.log("error from ChatInput", error);
    }
    finally{
      setInputText("");
    }




  }

  return (
    <Box
      sx={{
        p: 2,
        borderTop: 1,
        borderColor: "divider",
        display: "flex",
        gap: 1,
      }}
    >
      <FileUpload />

      <TextField
        fullWidth
        size="small"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
      />

      <Button variant="contained" onClick={handleSendMessage}>
        <SendIcon />
      </Button>
      {/* {error && <Typography color="error">{error}</Typography>} */}
    </Box>
  );
}
