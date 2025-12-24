import { useState } from "react";
import { getSessionsApi } from "../api/sessions";
import type { Session } from "../models/session";



export function useGetSessions() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function getSessions() {

        setIsLoading(true);
        setError(null);
        try
        {
            const data = await getSessionsApi();

            if(data)
            {
                setSessions(data);
            }
            else
            {
                setError("Failed to get sessions");
            }
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setIsLoading(false);
        }
    }

    return { sessions, isLoading, error, getSessions }
}