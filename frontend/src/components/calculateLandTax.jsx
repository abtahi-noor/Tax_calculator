import React, { useState } from "react";
import {useContext} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContext} from "../userContext";
//import {useNavigate} from "react-router-dom";

const CalculateLandTax = () => {
  //const navigate = useNavigate();
  const {u, setU} = useContext(UserContext);
  console.log(u)
  //useEffect(() => {
  //  if (u == null) {
  //    navigate("/login");
  //  }
  //}, [u, navigate]);

  const [landOrigin, setLandOrigin] = useState("");
  const [acres, setAcres] = useState("");
  const [landType, setLandType] = useState("");
  const [taxValue, setTaxValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/calculateLandTax', { landOrigin, acres, landType })
      .then(result => {
        setTaxValue(result.data.taxValue);
      })
      .catch(err => console.log(err));
  };

  const handleReset = () => {
    setLandOrigin("");
    setAcres("");
    setLandType("");
    setTaxValue(null);
  };

  return (
    <>
    <nav>
      <div className="nav-title" href="#">
          Tax Calculator
      </div>

      <div className="nav-items" >

          {
            (u==null)? (
                <div className="nav-item">
                    <Link to='/Home' className="nav-link">
                        Home
                    </Link>      
                </div>
            ):(
                <div className="nav-item">
                    <Link to='/userProfile' className="nav-link">
                        My Profile
                    </Link>      
                </div>                            
            )
          }

          <div className="nav-item">
              <Link to='/login' className="nav-link" onClick={() => setU(null)}>
                  Log Out
              </Link>                     
          </div>
      </div>
    </nav>

    <div style={{ textAlign: 'center', marginTop: '150px' }}>
      <div style={{ backgroundColor:'#8FBC8F', border: '1px solid #ddd', padding: '20px', borderRadius: '80px', maxWidth: '500px', margin: 'auto' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Calculate Land Tax</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}> Land Origin: </label>
            <Link style={{color: '#696969'}} to="/landcriteria"> See Land Criteria </Link>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {["Ka", "Kha", "Ga", "Gha", "Umo", "Cha"].map(option => (
                <div key={option} style={{ marginBottom: '10px' }}>
                  <input
                    type="radio"
                    id={option.toLowerCase()}
                    name="landOrigin"
                    value={option}
                    onChange={(e) => setLandOrigin(e.target.value)}
                    checked={landOrigin === option}
                    style={{ marginRight: '5px' }}
                  />
                  <label htmlFor={option.toLowerCase()}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Acres:</label>
            <input
              type="number"
              id="acres"
              name="acres"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              required
              style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Land Type:</label>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {["residential", "commercial", "industrial"].map(option => (
                <div key={option} style={{ marginBottom: '10px' }}>
                  <input
                    type="radio"
                    id={option}
                    name="landType"
                    value={option}
                    onChange={(e) => setLandType(e.target.value)}
                    checked={landType === option}
                    style={{ marginRight: '5px' }}
                  />
                  <label htmlFor={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Calculate Tax</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </form>

        {taxValue !== null && (
          <div style={{ marginTop: '20px', fontSize: '18px' }}>
            <p>Your Tax Value is BDT {taxValue}</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default CalculateLandTax;
