import axios from "axios";


console.log(import.meta.env.VITE_API_KEY);

export const axiosClient = axios.create(
    {
        
        baseURL: "http://localhost:8000",
        headers: {
            "Content-Type": "application/json",
            "X-API-key": import.meta.env.VITE_API_KEY,
        },
    }
)