import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import income_tax_image from "../images/incomeTax.jpg";
import land_tax_image from "../images/landTax.jpg";

const UserProfile = () => {
  const [users, setUsers] = useState(null);
  const [email, setEmail] = useState("aritra@gmail");
  setEmail("aritra@gmail")

  useEffect(() => {
    axios
      .get(`http://localhost:5000/userProfile?email=${email}`)
      .then((user) => {
        console.log("User data from API:", user.data);
        setUsers(user.data);
      })
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#32CD32', color: '#fff' }}>
        <div className="nav-title">
          Tax Calculator
        </div>
        <div className="nav-items" style={{ display: 'flex' }}>
          <div className="nav-item">
            <Link style={{ backgroundColor: '#32CD32' }} to='/userProfile' className="nav-link">
              My Profile
            </Link>
          </div>
          <div className="nav-item">
            <Link to='/' className="nav-link">
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link to='/' className="nav-link">
              Log Out
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
        {users ? (
          <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #ced4da', borderRadius: '10px', width: '48%', padding: '20px' }}>
            <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>User Profile</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <strong>First Name:</strong> {users.firstName}
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Last Name:</strong> {users.lastName}
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Email:</strong> {users.email}
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Sex:</strong> {users.sex}
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>National ID Number:</strong> {users.nid_number}
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Profession:</strong> {users.profession}
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong>Date of Birth:</strong> {users.dob}
              </li>
            </ul>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/updateProfile" className="btn btn-primary">
                Update Profile
              </Link>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', width: '48%' }}>Loading...</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '48%' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <img src={income_tax_image} alt="income-tax" style={{ width: '80%', borderRadius: '10px' }} />
            </div>
            <Link to='/IncomeTaxCalc' style={{ textDecoration: 'none', backgroundColor: '#32CD32', color: '#fff', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', display: 'inline-block', transition: 'background-color 0.3s ease' }}>
              Calculate <br/> Income Tax
            </Link>
          </div>

          <div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <img src={land_tax_image} alt="land-tax" style={{ width: '80%', borderRadius: '10px' }} />
            </div>
            <Link to='/calculatelandtax' style={{ textDecoration: 'none', backgroundColor: '#32CD32', color: '#fff', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', display: 'inline-block', transition: 'background-color 0.3s ease' }}>
              Calculate <br/> Land Tax
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
