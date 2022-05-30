import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";

export default function P2PDialog({open,onClose,onSubmit}){

    let [receiverId,setReceiverId]= useState(null);
    let [amount,setAmount] = useState(null);

    return(
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <div className='dialog-container'>
                <DialogTitle sx={{fontWeight:"bold"}}>Peer to Peer Transfer</DialogTitle>
                <div className="form-item">
                   <TextField label="Receiver Id" value={receiverId} onChange={ ( {target:{value}} ) =>setReceiverId(value) }></TextField>
                </div>
                <div className="form-item">
                   <TextField label="Amount" value={amount} onChange={ ( {target:{value}} ) =>setAmount(value) }></TextField>
                </div>
                <Button color="primary" variant="contained" onClick={()=>onSubmit(receiverId, amount)} >
                    Submit
                </Button>
            </div>
        </Dialog>
    )
    
}