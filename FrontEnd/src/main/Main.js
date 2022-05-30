import React from 'react'
import '../style/main.css';
import Withdraws from './Withdraws';
import Deposits from './Deposits';
import Bills from './Bills';
import FinancialAnalysis from './FinancialAnalysis';
import PeerToPeerHistory from './PeerToPeerHistory';
import Card from './Card';
import { useEffect , useState , useCallback ,Component}  from "react";

const Main = ({name, userToken, SERVER_URL}) => {
  
  let [display, setDisplay] = useState(1);
  
  return (
    <main>
      <div className="Cards">
        <div className="LeftMain">
          <Card
            head = "Withdraws"
            icon = ""
            myOnClick = {setDisplay}
            value = {1}
          />
          <Card
            head = "Deposits"
            icon = ""
            myOnClick = {setDisplay}
            value = {2}
          />
          <Card
            head = "P2P History"
            icon = ""
            myOnClick = {setDisplay}
            value = {3}
          />
          <Card
            head = "Reminders"
            icon = ""
            myOnClick = {setDisplay}
            value = {4}
          />
          <Card
            head = "Financial Analysis"
            icon = ""
            myOnClick = {setDisplay}
            value = {5}
          />
        </div>
        <div className="RightMain">
          {
            (display === 1) ? (
              <Withdraws 
                SERVER_URL = {SERVER_URL}
                userToken = {userToken}
              />
            ) : (display === 2) ? (
              <Deposits 
                SERVER_URL = {SERVER_URL}
                userToken = {userToken}
              />
            ) : (display === 3) ? (
              <PeerToPeerHistory 
                userToken = {userToken}
                SERVER_URL = {SERVER_URL}
              />
            ) : (display === 4) ? (
              <Bills 
                SERVER_URL = {SERVER_URL}
                userToken = {userToken}
              />
            ) : (display === 5) ? (
              <FinancialAnalysis 
                SERVER_URL = {SERVER_URL}
                userToken = {userToken}
              />
            ) : null
          }
        </div>
      </div>
    </main>
  )
}

export default Main