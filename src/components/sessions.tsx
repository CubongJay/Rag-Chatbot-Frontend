import {  Box, Button, List, ListItem,ListItemButton, Typography } from "@mui/material";
import type { Session } from "../models/session";
import { useGetSessions } from "../hooks/useGetSessions";
import { useEffect } from "react";

type GetSessionsProps = {
    activeSession: Session | null;
    onSelectSession: (session: Session) => void;
    onCreateSession: () => void;
}

export function GetSessions({ activeSession, onSelectSession, onCreateSession }: GetSessionsProps) {



    const { sessions, isLoading, error, getSessions } = useGetSessions();

    useEffect(() => {
        getSessions();
      }, []);


    if (isLoading) return <div>Loading sessions...</div>;
    if (error) return <div>{error}</div>;


    return(
        <>
            <Box sx={{ width: "100%"}}>
                <Typography variant="h6" sx={{  textAlign: 'center'}}>Sessions</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'right'}}>
                <Button sx={{ alignContent: 'left'}} onClick={onCreateSession}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 11.5C21 15.5869 17.1944 19 12.5 19C11.114 19 9.80931 18.7044 8.65345 18.1818L3 20L4.81818 14.3466C4.2956 13.1907 4 11.886 4 10.5C4 6.41309 7.80558 3 12.5 3C17.1944 3 21 6.41309 21 11.5Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11H15M12.5 8.5V13.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Button>

                </Box>
 
                <div className="sessions-list">
          
                    <List>
                        {sessions.map((s: Session) => (
                            <ListItem disablePadding key={s.sessionId}>
                                <ListItemButton key={s.sessionId} selected={activeSession?.sessionId === s.sessionId} onClick={() => onSelectSession(s)}>{s.title}</ListItemButton>
                            </ListItem>
                       
                        ))}

                    </List>

                </div>

            </Box>
  
        
    
        </>
    )
}