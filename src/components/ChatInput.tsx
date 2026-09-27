import { Box, Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FileUpload } from "./fileUpload";
import { useUploadFile } from "../hooks/useUploadFile";
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
  const { fileName, phase, isLoading, error, uploadFile } = useUploadFile();


  function handleFile(file: File) {
    uploadFile(file, idSession);
  }
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
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
        <FileUpload  onFileSelect={handleFile} isLoading={isLoading}/>

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
      </Box>



        {(phase === "processing" || phase === "success" || phase === "failed") && (
                <Box>
                    {phase === "processing" && (
                        <Typography variant="caption" color="text.secondary">
                            Processing document...
                        </Typography>
                    )}
                    {phase === "success" && (
                        <Typography variant="caption" color="success.main">
                            "{fileName}" ready
                        </Typography>
                    )}
                    {phase === "failed" && error && (
                        <Typography variant="caption" color="error">
                            {error}
                        </Typography>
                    )}
                </Box>
            )
          }



      </Box>
     
  );
}
