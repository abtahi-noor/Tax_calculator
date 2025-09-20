
import React, { useEffect, useState } from "react";
import { useContext } from 'react';
import axios from "axios";
import { UserContext } from "../userContext";


const Notification = ({ message, onClose }) => {     //{ message, onClose }
  //{console.log(notificationInfo.data.year)}
  //console.log(message)

  //return(
  //  //<button onClick={onClose}>Close</button>
  //  <>
  //    <p>IN</p>
  //  </>
  //)


  return(
    <div className="notification">
      <div className="notification-content">
        {/*<p>{message.data[0].year}</p>*/}
        {/*{console.log("here", message.data)}*/}

          {message.data.map((m, idx) => (
            //<p>{single_message}</p>
            <p key={idx}>TK {m.incomeTax+m.landTax+m.roadTax} total tax pending from {m.year}</p>
            
          ))}



        <button onClick={onClose}>Close</button>
      </div>
    </div>       
  )
 
   
};

const Notifications = () => {
  const { u } = useContext(UserContext);
  const [notificationInfo, setNotificationInfo] = useState()
  useEffect(() => {
    // Fetch user data based on the provided email address
    axios.get(`http://localhost:5000/notificationInfo?u=${u}`)
      .then((info) => {
        setNotificationInfo(info);
        //console.log(info)
      })
      .catch((err) => console.log(err));
  },[u]);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleShowNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);

    //setTimeout(() => {
    //  setShowNotification(false);
    //}, 3000);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="app-container">
      {/*<h1></h1>*/}
      <button onClick={() => handleShowNotification(notificationInfo)}>
        Show Notification
      </button>

      {showNotification && (
        <Notification message={notificationMessage} onClose={handleCloseNotification} />
        //<Notification message={notificationInfo} onClose={handleCloseNotification} />
        //console.log(notificationInfo.data.year)
        //<Notification notificationInfo={notificationInfo} onClose={handleCloseNotification} />
      )}
    </div>
  );
};

export default Notifications;