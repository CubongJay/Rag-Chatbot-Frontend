import { useState } from "react";
import { uploadFileApi, getDocumentStatusApi } from "../api/context";

  type UploadPhase = "idle" | "uploading" | "processing" | "success" | "failed"

export function useUploadFile() {
    
  

    const [fileName, setFileName] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [phase, setPhase] = useState<UploadPhase>("idle");
    const [error, setError] = useState<string | null>(null);

    async function uploadFile(file: File, sessionId: string) {
        // setIsLoading(true);
        setError(null);
        setPhase("uploading");
        setFileName(file.name);

        try{
            
            const response = await uploadFileApi(file, sessionId);
            setPhase("processing");



            while (true) {
                await new Promise((r) => setTimeout(r, 2000));
                const status = await getDocumentStatusApi(response.documentId);


                if (status.status === "success"){
                    setPhase("success");
                    return;
                }
                

                if (status.status === "failed"){
                    // setPhase("success");
                    throw new Error(status.errorMessage || "Processing failed");
                }

            }
            // if (response) {
            //     setFileName(response.fileName);
            // }
        }
        catch(error: Unknown){
            setError(error instanceof Error ? error.message: "Unknown error");
            setPhase("failed");
        }

    
    }

    
    const isLoading = phase === "uploading" || phase === "processing"
    
    return { fileName, phase, isLoading, error, uploadFile }
    
}