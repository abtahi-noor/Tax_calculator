import React, { useEffect, useState } from "react";
import { useContext } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
//import income_tax_image from "../images/incomeTax.jpg";
//import land_tax_image from "../images/landTax.jpg";
//import road_tax_image from "../images/roadTax.jpg";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";

function UserMessages() {
  const navigate = useNavigate();
  const { u, setU } = useContext(UserContext);
  console.log("current user:", u)
  useEffect(() => {
    if (u == null) {
      navigate("/login");
    }
  }, [u, navigate]);


  //const [users, setUsers] = useState(null); // Set initial state to null
  const email = useState(u); // Set the default email address
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    // Fetch user messages based on the provided email address
    axios
      .get(`http://localhost:5000/userMessages?email=${u}`)
      .then((response) => {
        console.log("User Messages data from API:", response.data);
        setMessages(response.data);
      })
      .catch((err) => console.log(err));
  }, [u, email]);

  const handleDeleteMessage = (messageId) => {
    // Delete the message based on the messageId
    axios
      .delete(`http://localhost:5000/deleteMessage/${messageId}`)
      .then((response) => {
        console.log("Message deleted:", response.data);
        // Update the messages state after deletion
        setMessages(messages.filter((message) => message.id !== messageId));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav>
        <div className="nav-title" href="#">
          Tax Calculator
        </div>
        <div className="nav-items" >
          <div className="nav-item">
            <Link to='/userProfile' className="nav-link">
              My Profile
            </Link>
          </div>
          <div className="nav-item">
            <Link style={{ backgroundColor: '#32CD32' }} to='/usermessages' className="nav-link">
              Messages
            </Link>
          </div>
          {/*<div className="nav-item">
            <Link to='/notifications' className="nav-link">
              Notifications
            </Link>
          </div>*/}
          <div className="nav-item">
            <Link to='/login' className="nav-link" onClick={() => setU(null)}>
              Log Out
            </Link>
          </div>
        </div>
      </nav>

      {/*<div className="container-fluid user-messages-container">
        <div className="row justify-content-center align-items-center">
          <div style={{paddingTop:'100px'}} className="col-md-8">
            <h2 style={{backgroundColor:'#32CD20', padding:'15px'}} className="text-center mb-4">Messages from Admin</h2>
            {messages && messages.length > 0 ? (
              <ul className="list-group">
                {messages.map((message) => (
                  <li  className="list-group-item">
                    <strong>Admin Name:</strong> {message.adminName} <br />
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
        <div className="user-messages-container">
          <div>
            <h2>Messages from admin</h2>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Topic</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr >
                  <td>{message.adminName}</td>
                  <td>{message.topic}</td>
                  <td>{message.message}</td>
                  <td>
                    <button onClick={() => handleDeleteMessage(message._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>          
        </div>

      ) : (
        <p className="text-center">No messages available.</p>
      )}

    {/*<div>
      <h2>USER QUERRIES</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Admin Name</th>
            <th>Topic</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr >
              <td>{message.adminName}</td>
              <td>{message.topic}</td>
              <td>{message.message}</td>
              <td>
                <button onClick={() => handleDeleteMessage(message._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>*/}
    </>
  );
}

export default UserMessages;