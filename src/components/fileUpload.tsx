import { Backdrop, Box,Button, CircularProgress, Typography } from "@mui/material";
import { useRef } from "react";
import { useUploadFile } from "../hooks/useUploadFile";


type FileUploadProps = {
    onFileSelect: (file: File) => void;
    isLoading: boolean
}

export function FileUpload({ onFileSelect, isLoading}: FileUploadProps) {
   
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        onFileSelect(file);
        // uploadFile(file, sessionId);
        event.target.value = "";
    }
        
        return (
    
    
            <>
                <input type="file" onChange={handleChange} ref={inputRef} style={{ display: "none"}}
                />
                <Button
                    variant="contained"
                    onClick={() => inputRef.current?.click()}
                    disabled={isLoading}
                    sx={{ minWidth: 40, width: 40, height: 40, p: 0}}
                    >
                        {isLoading ? <CircularProgress size={20} color="inherit"/>: "📎"}
                    </Button>
            </>
        );
           
}