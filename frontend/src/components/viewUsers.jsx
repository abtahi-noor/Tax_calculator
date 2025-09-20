import React, { useEffect, useState } from "react";
import {useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContext} from "../userContext";
import {useNavigate} from "react-router-dom";

function ViewUsers() {
  const navigate = useNavigate();
  const {u, setU} = useContext(UserContext);
  useEffect(() => {
    const validids = ["admin01", "admin02", "admin03"];

    if (u === null || !validids.includes(u)) {
      navigate("/authzone");
    }
  }, [u, navigate]);


  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/viewUsers')
      .then(users => setUsers(users.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#708090', color: '#000' }}>
        <div className="nav-title" style={{ color: '#fff' }}>
             Admin Dashboard
        </div>
        <div className="nav-items" style={{ display: 'flex' }}>
          <div className="nav-item">
            <Link style={{ backgroundColor: '#D3D3D3' }} to='/adminDashboard' className="nav-link">
              Dashboard
            </Link>
          </div>
          <div className="nav-item">
            <Link to='/' className="nav-link">
              Site Settings
            </Link>
          </div>
          <div  className="nav-item">
            <Link to='/home' className="nav-link" style={{ backgroundColor: '#FF0000' }} onClick={() => setU(null)}>
              Log Out
            </Link>
          </div>
        </div>
      </nav>


    <div style={{ backgroundColor: '#B0C4DE', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <div className="w-50">
        <h2  style={{ backgroundColor: '#778899', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55px'}}>User Details</h2>
        <table className="table">
          <thead>
            <tr >
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Sex</th>
              <th>Profession</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.sex}</td>
                <td>{user.profession}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default ViewUsers;
