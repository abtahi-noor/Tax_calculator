import React, { useEffect, useState } from "react";
import { useContext } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";

function AdminMessages() {
  const navigate = useNavigate();
  const { u, setU } = useContext(UserContext);
  useEffect(() => {
    const validids = ["admin01", "admin02", "admin03"];
  
    if (u === null || !validids.includes(u)) {
      navigate("/authzone");
    }
  }, [u, navigate]);

  //const [users, setUsers] = useState(null); // Set initial state to null
  const email = useState(u); // Set the default email address
  const [messages, setMessages] = useState(null);
  
  useEffect(() => {
    // Fetch user messages based on the provided email address
    axios
      .get(`http://localhost:5000/adminMessages?adminID=${u}`)
      .then((response) => {
        console.log("Messages data from API:", response.data);
        setMessages(response.data);
      })
      .catch((err) => console.log(err));
  }, [u, email]);

  const handleDeleteMessage = (messageId) => {
    // Delete the message based on the messageId
    axios
      .delete(`http://localhost:5000/admindeleteMessage/${messageId}`)
      .then((response) => {
        console.log("Message deleted:", response.data);
        // Update the messages state after deletion
        setMessages(messages.filter((message) => message.id !== messageId));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#708090', color: '#000' }}>
        <div className="nav-title" style={{ color: '#fff' }}>
          Admin Dashboard
        </div>
        <div className="nav-items" style={{ display: 'flex' }}>
          <div className="nav-item">
            <Link  to='/adminDashboard' className="nav-link">
              Dashboard
            </Link>
          </div>
          <div className="nav-item">
            <Link style={{ backgroundColor: '#D3D3D3' }} to='/adminmessages' className="nav-link">
              Messages
            </Link>
          </div>
          <div className="nav-item">
            <Link to='/authzone' className="nav-link" style={{ backgroundColor: '#FF0000' }} onClick={() => setU(null)}>
              Log Out
            </Link>
          </div>
        </div>
      </nav>

      {/*<div style={{ backgroundColor: '#B0C4DE', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }} className="container-fluid user-messages-container" >
        <div className="row justify-content-center align-items-center" >
          <div className="col-md-8" style={{  width: '500px' }} >
            <h2 style={{backgroundColor: '#708080', width: '500px', paddingTop:'80px',  paddingBottom:'5px'}} className="text-center mb-4"> User Queries </h2>
            {messages && messages.length > 0 ? (
              <ul className="list-group">
                {messages.map((message) => (
                  <li style={{ paddingleft: '0px',  width: '500px' }} className="list-group-item">
                    <strong >User Name:</strong> {message.fullName} <br />
                    <strong>User Email:</strong> {message.email} <br />
                    <strong>Subject:</strong> {message.topic} <br />
                    <strong>Message:</strong> {message.message}
                    <button
                      className="btn btn-danger btn-sm float-end"
                      onClick={() => handleDeleteMessage(message._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No messages available.</p>
            )}
          </div>
        </div>
      </div>*/}


      {messages && messages.length > 0 ? (
          <div className="admin-messages-container">
            <div className="admin-messages-cont">
              <h2>User Messages</h2>
              {messages.map((message) => (
                <div className="admin-message-box">
                  <div className="admin-message-delete">
                    <button
                          className="btn btn-danger btn-sm "
                          onClick={() => handleDeleteMessage(message._id)}
                        >
                          Delete
                    </button>                  
                  </div>                  
                  <div className="admin-message-subject">
                    <strong>Topic:</strong> {message.topic}
                  </div>
                  <div className="admin-message-content">
                    <strong>User Name:</strong> {message.fullName}
                  </div>
                  <div className="admin-message-content">
                    <strong>User Email:</strong> {message.email}
                  </div>
                  <div className="admin-message-content">
                    <strong>Message:</strong> {message.message}
                  </div>

                </div>
                
              ))}
            </div>

          </div>
      ) : (
        <p className="text-center">No messages available.</p>
      )}
    </>
  );
}

export default AdminMessages;