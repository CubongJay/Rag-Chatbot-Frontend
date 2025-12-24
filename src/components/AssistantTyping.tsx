import { Box, CircularProgress, Typography } from "@mui/material";

export function AssistantTyping() {
    return (
        <Box sx={{ display: "flex", alignItems: "center", 
        gap: 1,
        px: 2,
        py: 1, opacity: 0.7}}>
            <CircularProgress size={20} />
            <Typography variant="body2">Assistant is typing</Typography>
        </Box>
    )
}