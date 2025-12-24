import axios from "axios";
import { axiosClient } from "./axiosClient";


type UploadFileResponse = {
    fileName: string;
    status: string;
}


export async function uploadFileApi(file: File): Promise<UploadFileResponse> {
    try
    {
        
        const formData = new FormData();
        formData.append("file", file);
        
        const response = await axiosClient.post("/rag-context/documents/upload/", formData, {headers: {"Content-Type": "multipart/form-data"}});
        return response.data;
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