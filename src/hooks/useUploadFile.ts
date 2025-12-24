import { useState } from "react";
import { uploadFileApi } from "../api/context";
export function useUploadFile() {
    

    const [fileName, setFileName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function uploadFile(file: File) {
        setIsLoading(true);

        try{
            
            const response = await uploadFileApi(file);
            if (response) {
                setFileName(response.fileName);
            }
        }
        catch(error: any){
            setError(error.message);
        }

        finally{
            setIsLoading(false);
        }
    }


    
    return { fileName, isLoading, error, uploadFile }
    
}