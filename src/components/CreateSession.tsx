import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

import { useState } from "react";

type CreateSessionProps = {
    open: boolean;
    onClose: () => void;
    onCreate: (title: string) => void;
};


export function CreateSessionDialog({ open, onClose, onCreate }: CreateSessionProps) {
    const [title, setTitle] = useState<string>("");

    function handleCreate() {
        if (!title.trim()) return;

        onCreate(title.trim());
        setTitle("");

    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Session</DialogTitle>
            <DialogContent>
                <TextField label="Session Title" value={title} onChange={(e) => setTitle(e.target.value)} margin="dense" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>

        </Dialog>

    );
};