import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

function ChangePassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [enteredKey, setEnteredKey] = useState()
  const [randomKey, setRandomKey] = useState([])
  const [changePass, setChangePass] = useState(false)  // flag
  const [newPass, setNewPass] = useState()
  //const [securityKey, setSecurityKey] = useState("");
  //const [newPassword, setNewPassword] = useState("");
  //const [error, setError] = useState("");
  //const navigate = useNavigate();

  const generateRandomKey = (length) => {
    const characters = "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const makeKey = () => {
    if(randomKey.length === 0){
      setRandomKey( prevList => [...prevList, generateRandomKey(6)] )     
    }
  }
  makeKey()

  const [emailRes, setEmailRes] = useState() //response of sending email
  //const [emailSent, setEmailRes] = useState() //response of sending email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    //add random key to list
    //setRandomKey( prevList => [...prevList, generateRandomKey(6)] )
    //console.log("in", randomKey)
    axios.post("http://localhost:5000/sendEmail", { email, randomKey })
      .then((response) => {
        console.log(response)
        setEmailRes(response.data)
      })
      .catch((error) => {
        console.error("Error checking security key:", error);
      });
  };

  const handleEnteredKey = (e) =>{  
    console.log(randomKey, enteredKey)
    e.preventDefault();
    if(enteredKey === randomKey[0]){
      setChangePass(true)
    }
  };

  const handleNewPassSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/updatePass", { email, newPass })
      .then((response) => {
        console.log(response)
        navigate("/login")
      })
      .catch((error) => {
        console.error("Error updating password:", error);
      });
  };

  return (
    <>
                <nav>
                <div className="nav-title" href="#">
                    Tax Calculator
                </div>
                <div className="nav-item">
                  <Link to='/' className="nav-link">
                      Home
                  </Link>      
              </div>

                </nav>

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop:"130px" }}>
      <form style={{padding:'30px 40px', backgroundColor: "#f0f0f0", borderRadius: "8px", textAlign: "center" }} onSubmit={handleEmailSubmit}>
        <h2 style={{ marginBottom: "30px", color: "#2196F3" }}>Enter email to get security key</h2>
        {/*{error && <p style={{ color: "red" }}>{error}</p>}*/}
        <label style={{ marginRight: "10px" }}>
          Email:
          <input type="email" onChange={(e) => setEmail(e.target.value)} style={{ marginLeft: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
        </label>
        <button type="submit" style={{ backgroundColor: "#2196F3", color: "#fff", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Send security key</button>

        {
          (emailRes)? (<div style={{ marginTop:"10px",color:"#2196F3",fontSize:"19px" }}>{emailRes}</div>):(<></>)
        }
      </form>
      
    </div>

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop:"50px" }}>
      <form style={{padding:'30px 40px', backgroundColor: "#f0f0f0", borderRadius: "8px", textAlign: "center" }} onSubmit={handleEnteredKey}>
        <h2 style={{ marginBottom: "30px", color: "#2196F3" }}>Enter security key</h2>
        {/*{error && <p style={{ color: "red" }}>{error}</p>}*/}
        <label style={{ marginRight: "10px" }}>
          Key:
          <input type="text"  onChange={(e) => setEnteredKey(e.target.value)} style={{ marginLeft: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
        </label>
        <button type="submit" style={{ backgroundColor: "#2196F3", color: "#fff", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Verify</button>
      </form>
    </div>
    {/*{console.log(randomKey, enteredKey)}*/}

    {console.log(changePass)}
    {
      (changePass===true)? (
        //{console.log(changePass)}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop:"50px" }}>
        <form style={{padding:'30px 40px', backgroundColor: "#f0f0f0", borderRadius: "8px", textAlign: "center" }} onSubmit={handleNewPassSubmit}>
          <h2 style={{ marginBottom: "30px", color: "#2196F3" }}>Enter new password:</h2>
          {/*{error && <p style={{ color: "red" }}>{error}</p>}*/}
          <label style={{ marginRight: "10px" }}>
            New Password:
            <input type="text"  onChange={(e) => setNewPass(e.target.value)} style={{ marginLeft: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} required />
          </label>
          <button type="submit" style={{ backgroundColor: "#2196F3", color: "#fff", padding: "10px 20px", borderRadius: "4px", border: "none", cursor: "pointer" }}>Submit</button>
        </form>
        </div>
      ):(<></>)
    }

    </>
  );
  
  
}


export default ChangePassword;
