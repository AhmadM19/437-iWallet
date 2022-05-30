import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";


export default function ReminderDialog({open,onClose,onSubmit}){
    //description , amount , due_date (date time.date()) , auto_pay(boolean)
    let [description,setDescription]= useState("");
    let [amount,setAmount] = useState(null);
    let [dueDate,setDueDate] = useState("");
    let [autoPay, setAutoPay] = useState(null);
    let [receiver_id,setReceiver_id]= useState(null);

    return(
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <div className='dialog-container'>
                <DialogTitle sx={{fontWeight:"bold"}}>Reminder</DialogTitle>
                <div className="form-item">
                   <TextField label="Description" type="text" value={description} onChange={ ( {target:{value}} ) =>setDescription(value) }></TextField>
                </div>
                <div className="form-item">
                   <TextField label="Receiver Id" value={receiver_id} onChange={ ( {target:{value}} ) =>setReceiver_id(value) }></TextField>
                </div>
                <div className="form-item">
                   <TextField label="Amount" value={amount} onChange={ ( {target:{value}} ) =>setAmount(value) }></TextField>
                </div>
                <div className="form-item">
                   <label id="datelabel" htmlFor="date">Due Date </label>
                   <TextField id="date" type="date" value={dueDate} onChange={ ( {target:{value}} ) =>setDueDate(value) }></TextField>
                </div>
                <div className="form-item">
                  <label htmlFor="autopay-type">Auto Pay </label>
                  <select id="autopay-type" variant="outlined" size='small'  value={autoPay} onChange={e=>setAutoPay(e.target.value)  } >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>     
                
                <Button color="primary" variant="contained" onClick={()=>onSubmit(description, amount, dueDate, autoPay,receiver_id)} >
                    Submit
                </Button>
            </div>
        </Dialog>
    )
    
}