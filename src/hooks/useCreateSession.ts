import { useState } from "react";
import type {Session} from "../models/session";
import type { CreateSessionRequest } from "../models/session";
import { createSessionApi } from "../api/sessions";




export function useCreateSession() {

    // const [someData, setSomeData] = useState<string>("");
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function createSession(request: CreateSessionRequest) {
        setIsLoading(true);


        try{
            const data = await createSessionApi(request);
            if (data) {
                setSession(data);
            }
            else {
                setError("Failed to create session");
            }
        }
        catch(error: any){
            setError(error.message);
        }
        finally{
            setIsLoading(false);
        }


    }







    return {session, isLoading, error, createSession}

}
