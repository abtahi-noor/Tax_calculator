import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function SecurityKey() {
    const navigate = useNavigate();
    const { u, setU } = useContext(UserContext);
    //console.log("current user:", u)
    useEffect(() => {
      if (u == null) {
        navigate("/login");
      }
    }, [u, navigate]);


  const [securityKey, setSecurityKey] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch security key data for the user
    axios.get(`http://localhost:5000/securityKey/${u}`)
      .then((response) => {
        if (response.data) {
          // If data exists, set the values
          setSecurityKey(response.data.key);
          setEmail(response.data.email);
        } else {
          // If no data, generate a new security key
          generateAndSaveSecurityKey();
        }
      })
      .catch((error) => console.error("Error fetching security key:", error));
  });  

  const generateAndSaveSecurityKey = () => {
    // Generate a new security key
    const newSecurityKey = generateRandomKey(10);
 
    // Save the new security key in the database
    axios.post("http://localhost:5000/securityKey", {
      email: u,
      key: newSecurityKey,
    })
      .then(() => {
        // Set the state with the new values
        setSecurityKey(newSecurityKey);
        setEmail(u);
      })
      .catch((error) => console.error("Error saving security key:", error));
  };  





  const generateRandomKey = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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
                        <Link to='/login' className="nav-link" style={{ backgroundColor: '#FF0000' }} onClick={() => setU(null)}>
                            Log Out
                        </Link>
                    </div>
                </div>
            </nav>



    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}>
      <div style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        width: "600px",
        borderRadius: "8px",
        textAlign: "center",
      }}>
        <h2>This is your Security Key:</h2>
        <p> </p>
        <p>Email: {email}</p>
        <p>Key: {securityKey}</p>
        <p> <i> <b> [Store it physically in a safe place]  </b> </i></p>
        <button
          style={{
            padding: "8px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginTop: "10px",
          }}
          onClick={generateAndSaveSecurityKey}
        >
          Regenerate
        </button>
      </div>
    </div>
    </>
  );
}

export default SecurityKey;
