import { useState } from "react";

import type { MessagePairResponse } from "../models/message";
import type { CreateMessageRequest } from "../models/message";
import { createMessageApi } from "../api/messages";


export function useCreateMessage() {
    const [message, setMessage] = useState<MessagePairResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function createMessage(sessionId: string, request: CreateMessageRequest) {
        setIsLoading(true);
        try{
            const data = await createMessageApi(sessionId, request);
            if (data) {
                setMessage(data);
                return data;
            }
            else {
                setError("Failed to create message");
            }
        }
        catch(error: unknown){
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("An unknown error occurred");
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    return { message, isLoading, error, createMessage };
}