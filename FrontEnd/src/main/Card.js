// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import React from 'react';
import '../style/card.css';
import {FaWallet} from 'react-icons/fa';

const Card = ({head, icon, myOnClick, value}) => {
  return (
    <div className="card" onClick = {() => myOnClick(value)}>
      <FaWallet className = "cardIcon"/>
      <h2>{head}</h2>
    </div>
  )
}

export default Card;