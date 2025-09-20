//import "bootstrap/dist/css/bootstrap.min.css";
//import '../index.css'; 
import { useState, useEffect } from "react";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {UserContext} from "../userContext";

function AddProfileInformation() {
  const navigate = useNavigate()
  const { u, setU } = useContext(UserContext);
  console.log(u)
  useEffect(() => {
    console.log(u)
    if (u == null) {
      navigate("/login");
    }
  }, [u, navigate]);

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  //const [email, setEmail] = useState()
  const [sex, setSex] = useState()
  const [nid_number, setNID] = useState()
  const [profession, setProfession] = useState()
  const [dob, setDOB] = useState()


  const handleSubmit = (e) => {  // form submit
    e.preventDefault()
    axios.post('http://localhost:5000/addProfileInformation', { firstName, lastName, u, sex, nid_number, profession, dob }) // sending json body to server for uploading to DB
      .then((result) => {
        console.log(result)  // showing response which came back from the server
        console.log("Successful")
        navigate("/userProfile")
      })

      .catch(err => console.log(err))
  }

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
      
      <div className="container-box">
        <div className="box">
          <h2> Add Profile Informations </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName"> First Name:  </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                //  value={formData.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName"> Last Name: </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                //  value={formData.lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label> Sex: </label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="Male"
                    onChange={(e) => setSex(e.target.value)}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="Female"
                    onChange={(e) => setSex(e.target.value)}
                    required
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="Others"
                    onChange={(e) => setSex(e.target.value)}
                    required
                  />
                  Others
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="nid">National ID Number: </label>
              <input
                type="text"
                id="nid"
                name="nid"
                onChange={(e) => setNID(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="profession">Profession: </label>
              <input
                type="text"
                id="profession"
                name="profession"
                onChange={(e) => setProfession(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth: </label>
              <input
                type="date"
                id="dob"
                name="dob"
                onChange={(e) => setDOB(e.target.value)}
                required
              />
            </div>
            <button type="submit">
              Save
            </button>
          </form>
          <Link to='/userProfile' className="btn btn-default w-100 bg-light rounded-0 text-decoration-none">
            Skip For Now
          </Link>
        </div>
      </div>
    </>


  )
}


export default AddProfileInformation;    