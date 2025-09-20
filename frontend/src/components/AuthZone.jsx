import { useState } from "react";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

function Login() {
  const { setU } = useContext(UserContext);  //const {u, setU} = useContext(UserContext);
  const [adminID, setID] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {  // form submit
    e.preventDefault()
    axios.post('http://localhost:5000/authzone', { adminID, password }) // sending json body to server for validation
      .then((result) => {
        console.log(result)  // showing response which came back from the server
        if (result.data === "Success") {
          setU(adminID)
          navigate("/admindashboard") // go to home page after login
        }

      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <nav style={{ padding: '20px', backgroundColor: '#708090', color: '#E6E6FA', margin: '0px' }}>
        <div className="nav-title" href="#" style={{ color: '#E6E6FA', padding: '0px', }}>
          Tax Calculator [Danger Zone]
        </div>

      </nav>
      <div className="container-box" style={{ backgroundColor: '#B0C4DE', display: 'top', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100%', marginTop: '0px' }}>
        <div className="box">
          <h2> Admin Login </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="adminID">Admin ID:   </label>
              <input
                type="text"
                id="adminID"
                name="adminID"
                //  value={formData.email}
                onChange={(e) => setID(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                //  value={formData.password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">
              Login
            </button>
          </form>

          <Link to='/home' className="btn btn-default w-100 bg-light rounded-0 text-decoration-none">
            Go To Homepage
          </Link>
        </div>
      </div>
    </>

  )
}

export default Login;