import { Backdrop, Box,Button, CircularProgress, Typography } from "@mui/material";
import { useRef } from "react";
import { useUploadFile } from "../hooks/useUploadFile";
// type FileUploadProps = {
//     onFileSelect: (file: File) => void;
// }

export function FileUpload() {
    const { fileName, isLoading, error, uploadFile } = useUploadFile();
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        // onFileSelect(file);
        uploadFile(file);
    }
        
        return (
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
                <input type="file" onChange={handleChange} ref={inputRef} style={{ display: 'none'}}/> 
                <Button variant="contained" color="primary"  onClick={() => inputRef.current?.click()}>📎</Button>
            
                {error && <span style={{ color: 'red' }}>{error}</span>}
                {fileName && <span style={{ color: 'green' }}>File "{fileName}" Uploaded successfully!</span>}
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                   
                    {/* {isLoading && <CircularProgress size={20} />} */}
                    <Backdrop open={isLoading}>
                        <CircularProgress size={20} />
                    </Backdrop>
                    {fileName && !isLoading && (
                    <Typography color="success.main" variant="body2">
                        File "{fileName}" uploaded successfully!
                    </Typography>
                )}


                {error && !isLoading && fileName && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}

                </Box>


      
            </Box>
        )
           
}