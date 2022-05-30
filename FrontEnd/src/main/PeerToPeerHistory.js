import React from 'react'
import {useState, useEffect, useCallback}  from "react";
import { DataGrid} from '@mui/x-data-grid';
import '../style/main.css';

const PeerToPeerHistory = ({userToken, SERVER_URL}) => {

  let [userTransactions, setUserTransactions] = useState([]);

  const fetchUserTransactions = useCallback(() => {
    fetch(`${SERVER_URL}/getTransactions`, {
      headers: {
        Authorization: `bearer ${userToken}`,
      },
    })
    .then((response) => response.json())
    .then((transactions) => setUserTransactions(transactions));
    }, [userToken]);
    useEffect(() => {
      if (userToken) {
        fetchUserTransactions();
      }
  }, [fetchUserTransactions, userToken]); 

  const transactionscols= [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'amount', headerName: 'USD Amount', width: 200 },
    { field: 'receiver_id', headerName: 'Receiver ID', width: 200 },
    { field: 'sender_id', headerName: 'Sender ID ', width: 200 },
    { field: 'added_date', headerName: 'Date ', width: 200 }
  ];

  return (
    <div className = "DataGrid">
      <DataGrid
        columns={transactionscols}
        rows={userTransactions}
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
          "& .MuiDataGrid-root": {
            color: "#fff",
          }
        }}
      />
    </div>
  )
}

export default PeerToPeerHistory