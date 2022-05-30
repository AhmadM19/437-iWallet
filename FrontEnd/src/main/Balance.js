
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from "react";
import { Typography } from '@mui/material';


export default function BalanceDialog({open,onClose,balance}){


    return(
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <div className='dialog-container'>
                <DialogTitle sx={{fontWeight:"bold"}}>Balance</DialogTitle>
                <div className="form-item">
                   <Typography align="center" variant="h6">Your wallet ballance is: {balance}</Typography> 
                </div>     
            </div>
        </Dialog>
    )
    
}