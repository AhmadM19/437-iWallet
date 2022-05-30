import React from 'react';
import {useState, useEffect, useCallback}  from "react";
import { DataGrid} from '@mui/x-data-grid';
import '../style/main.css';

const Withdraws = ({userToken, SERVER_URL}) => {
  let [userWithdraws, setUserWithdraws] = useState([]);

  const fetchUserWithdraws = useCallback(() => {
    fetch(`${SERVER_URL}/getWithdraws`, {
      headers: {
        Authorization: `bearer ${userToken}`,
      },
    })
    .then((response) => response.json())
    .then((Withdraws) => setUserWithdraws(Withdraws));
    }, [userToken]);
    useEffect(() => {
      if (userToken) {
        fetchUserWithdraws();
      }
  }, [fetchUserWithdraws, userToken]); 

  const withdrawcols = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'added_date', headerName: 'Date', width: 150 },
    { field: 'amount', headerName: 'Amount ', width: 150 },
  ];

  return (
    <div className = "DataGrid">
      <DataGrid
        columns={withdrawcols}
        rows={userWithdraws}
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
          },
        }}
      />
    </div>
  )
}

export default Withdraws