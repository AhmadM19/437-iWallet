import './App.css';
import NavBar from './nav/Navbar';
import Main from './main/Main';
import {useState} from 'react';
import SignInUp from './signinup/SignInUp';
import {getUserToken} from './localStorage';

function App() {
  var SERVER_URL = "http://89.249.219.54:5000";
  let [name_user, setName_user] = useState("");
  let [userToken, setUserToken] = useState(getUserToken());

  const States = {
    p2p : 1,
    reminder : 2,
    balance : 3,
    nothing : 0
  }

  let [actionState, setActionState] = useState(0);

  return (
    <div className="App">
      {
        userToken === null ? (
          <SignInUp 
            userToken = {userToken}
            setUserToken = {setUserToken}
            setName_user = {setName_user}
          />
        ) : (
          <>
            <NavBar
              setUserToken = {setUserToken}
              States = {States}
              actionState = {actionState}
              setActionState = {setActionState}
              SERVER_URL = {SERVER_URL}
              userToken = {userToken}
            />
            <Main
              SERVER_URL = {SERVER_URL}
              userToken = {userToken}
            />
          </>
        )
      }
    </div>
  );
}

export default App;
