import { useState } from "react";
import { getMessagesApi } from "../api/messages";
import type { Message } from "../models/message";

export function useGetMessages() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);


    // async function getMessages(sessionId: string) {
    //     setIsLoading(true);
    //     try{
    //         const data = await getMessagesApi(sessionId);
    //         if (data) {
    //             console.log(data)
    //            const messages =  data.items.map((item) => {
    //                 return {
    //                     role: item.sender,
    //                     content: item.content,
    //                 }
    //             })
    //             return messages
    //         }
    //         else {
    //             setError("Failed to get messages");
    //         }
    //     }
    //     catch(error: unknown){
    //         if (error instanceof Error) {
    //             setError(error.message);
    //         }
    //         else {
    //             setError("An unknown error occurred");
    //         }
    //     }
    //     finally{
    //         setIsLoading(false);
    //     }
    // }


    async function getAllMessages(sessionId: string) {
        setIsLoading(true);
        setError(null);
      
        try {
          let page = 1;
          const allMessages: Message[] = [];
      
          while (true) {
            const data = await getMessagesApi(sessionId, page);
      
            if (data?.items) {
              const mapped = data.items.map(item => ({
                role: item.sender === "user" ? "user" : "assistant",
                content: item.content,
              }));
      
              allMessages.push(...mapped);
      
              // check if there are more pages
              if (page >= data.pagination.pages) break;
              page += 1;
            } else {
              setError("Failed to get messages");
              break;
            }
          }
      
          return allMessages;
        } catch (error: unknown) {
          if (error instanceof Error) setError(error.message);
          else setError("An unknown error occurred");
          return [];
        } finally {
          setIsLoading(false);
        }
      }
      

    return {  isLoading, error, getAllMessages };
}