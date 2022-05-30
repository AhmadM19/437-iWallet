import React from 'react'
import {useState, useEffect, useCallback}  from "react";
import { DataGrid} from '@mui/x-data-grid';
import '../style/main.css';

const Bills = ({userToken, SERVER_URL}) => {

  let [userReminders, setUserReminders] = useState([]);


  const fetchUserReminders = useCallback(() => {
    fetch(`${SERVER_URL}/getReminders`, {
      headers: {
        Authorization: `bearer ${userToken}`,
      },
    })
    .then((response) => response.json())
    .then((reminders) => setUserReminders(reminders));
    }, [userToken]);
    useEffect(() => {
      if (userToken) {
        fetchUserReminders();
      }
  }, [fetchUserReminders, userToken]); 

  const reminderscols= [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'amount', headerName: 'Amount ', width: 150 },
    { field: 'auto_pay', headerName: 'Auto Pay  ', width: 150 },
    { field: 'paid', headerName: 'Paid ', width: 150 },
    { field: 'date', headerName: 'Due Date', width: 150 },
    { field: 'added_date', headerName: 'Created ', width: 150 },
    { field: 'receiver_id', headerName: 'Receiver ID ', width: 150 },
  ];

  return (
    <div className = "DataGrid">
    <DataGrid
      columns={reminderscols}
      rows={userReminders}
      sx={{
        width: 900,
        height: 500,
        '& .MuiDataGrid-row:hover': {
          color: '#94c11f',
          backgroundColor: '#000'
        },
        '& .MuiDataGrid-row': {
          color: '#fff',
          backgroundColor: '#282c34'
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#94c11f",
          color: "#fff",
          fontSize: 20
        },
        "& .MuiDataGrid-columnFooter": {
          backgroundColor: "#94c11f",
          color: "#fff",
          fontSize: 20
        }
      }}
    />
  </div>
  )
}

export default Bills;