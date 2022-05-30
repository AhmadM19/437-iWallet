import React from 'react'
import {useState, useEffect, useCallback}  from "react";
import { DataGrid} from '@mui/x-data-grid';
import '../style/main.css';

const Deposits = ({userToken, SERVER_URL}) => {
  let [userDeposits, setUserDeposits] = useState([]);

  const fetchUserDeposits = useCallback(() => {
    fetch(`${SERVER_URL}/getDeposits`, {
      headers: {
        Authorization: `bearer ${userToken}`,
      },
    })
    .then((response) => response.json())
    .then((Deposits) => setUserDeposits(Deposits));
    }, [userToken]);
    useEffect(() => {
      if (userToken) {
        fetchUserDeposits();
      }
  }, [fetchUserDeposits, userToken]); 

  const depositcols = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'added_date', headerName: 'Date', width: 200 },
    { field: 'amount', headerName: 'Amount ', width: 200 },
  ];

  return (
    <div className = "DataGrid">
      <DataGrid
        columns={depositcols}
        rows={userDeposits}
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

export default Deposits