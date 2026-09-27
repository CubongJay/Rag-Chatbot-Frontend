import axios from "axios";
import { axiosClient } from "./axiosClient";


// type UploadFileResponse = {
//     fileName: string;
//     status: string;
//     sessionId: string;
// }
interface UploadFileResponseApi {
    document_id: string;
    file_path: string;
    status: string;
}

interface UploadFileResponse {
    documentId: string;
    filePath: string;
    status: string;
}
interface DocumentStatusResponseApi {
    document_id: string;
    status: string;
    file_name: string;
    chunk_count: number;
    error_message: string | null ;

}
interface DocumentStatusResponse {
    documentId: string;
    status: string;
    fileName: string;
    chunkCount: number;
    errorMessage: string | null;

}


function mapUploadFileResponse(response: UploadFileResponseApi): UploadFileResponse{
    return {
        documentId: response.document_id,
        filePath: response.file_path,
        status: response.status
    }
}


function mapDocumentStatusResponse(response: DocumentStatusResponseApi): DocumentStatusResponse {
    return {
        documentId: response.document_id,
        status: response.status,
        fileName: response.file_name,
        chunkCount:  response.chunk_count,
        errorMessage: response.error_message
    };
}

export async function uploadFileApi(file: File, sessionId: string): Promise<UploadFileResponse> {
    try
    {
        
        const formData = new FormData();
        formData.append("file", file);
        
        const response = await axiosClient.post<UploadFileResponseApi>(`/rag-context/documents/upload/?session_id=${sessionId}`, formData, {headers: {"Content-Type": "multipart/form-data"}});
        return mapUploadFileResponse(response.data);
    }
    catch(error)
    {
        if (axios.isAxiosError(error))
        {
            throw new Error(error.response?.data?.message || error.message);
        }
        throw new Error("Failed to upload file");
    }
}

export async function getDocumentStatusApi(documentId: string): Promise<DocumentStatusResponse>{
    try
    {
        const response = await axiosClient.get<DocumentStatusResponseApi>(`/rag-context/documents/status/${documentId}`)
        return mapDocumentStatusResponse(response.data);
    }
    catch(error)
    {
        if (axios.isAxiosError(error))
        {
            throw new Error(error.response?.data?.message || error.message);
        }
        throw new Error("Failed to get document status");
    }

}