import React, { useEffect, useState } from "react";
import { useContext } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import view_users_image from "../images/landTax.jpg";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { u, setU } = useContext(UserContext);
  useEffect(() => {
    const validids = ["admin01", "admin02", "admin03"];

    if (u === null || !validids.includes(u)) {
      navigate("/authzone");
    }
  }, [u, navigate]);

  const [incVariables, setIncomeVariables] = useState(0)
  useEffect(() => {
    axios.get('http://localhost:5000/incVariables')
      .then((result) => {
        setIncomeVariables(result.data)
        //console.log(incVariables.maleCondition1)
      })
      .catch(err => console.log(err))

  })

  const [maleCond1, setMaleCond1] = useState()
  const [maleCond2, setMaleCond2] = useState()
  const [maleCond3, setMaleCond3] = useState()
  const [maleCond4, setMaleCond4] = useState()
  const [maleCond5, setMaleCond5] = useState()
  const [femaleCond1, setFemaleCond1] = useState()
  const [femaleCond2, setFemaleCond2] = useState()
  const [femaleCond3, setFemaleCond3] = useState()
  const [femaleCond4, setFemaleCond4] = useState()
  const [femaleCond5, setFemaleCond5] = useState()
  const [fighterCond1, setFighterCond1] = useState()
  const [fighterCond2, setFighterCond2] = useState()
  const [fighterCond3, setFighterCond3] = useState()
  const [fighterCond4, setFighterCond4] = useState()
  const [fighterCond5, setFighterCond5] = useState()


  const handleSubmit = (e) => {  // form submit
    e.preventDefault()

    axios.put('http://localhost:5000/incUpdate', { maleCond1, maleCond2, maleCond3, maleCond4, maleCond5, femaleCond1, femaleCond2, femaleCond3, femaleCond4, femaleCond5, fighterCond1, fighterCond2, fighterCond3, fighterCond4, fighterCond5 }) // sending json body to server for calculating tax        
      .then((result) => {
        //setIncomeTax(result.data);
        console.log(result)  // showing response which came back from the server
      })
      .catch(err => console.log(err))
  }

  const [userEmail, setUserEmail] = useState()
  const [adminName, setAdminName] = useState() 
  const [topic, setTopic] = useState()
  const [message, setMessage] = useState()
  const handleMessageSubmit = (e) => {  // form submit
    e.preventDefault()
    axios.post('http://localhost:5000/adminMessage', { userEmail, adminName, topic, message }) // sending json body to server for uploading to DB
      .then((result) => {
        console.log(result)  // showing response which came back from the server
        document.getElementById("admin-contact-form").reset();
      })

      .catch(err => console.log(err))
  }


  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#708090', color: '#000' }}>
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
            <Link to='/adminmessages' className="nav-link">
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

      <div style={{ backgroundColor: '#B0C4DE', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <div style={{ backgroundColor: '#E6E6FA', border: '1px solid #ced4da', borderRadius: '10px', padding: '20px', width: '50%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to Admin Dashboard</h2>
          <p style={{ textAlign: 'center' }}>Here, you can manage user profiles, site settings, and more..</p>
          <div className='home-container'>
          </div>

          <div>
            <div >
              <button
                style={{
                  backgroundColor: '#E6E6FA',
                  border: 'none',
                  padding: '20px',
                  margin: '15px'
                }}
              >
                <Link
                  to='/viewusers'
                  className='overlay-button'
                  style={{
                    display: 'block',
                    width: '250px',
                    height: '100%',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: '#191970',
                    backgroundColor: '#E6E6FA',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    justifyContent: 'center', alignItems: 'center'
                  }}
                >
                  🔎 View Users List
                </Link>
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className='inc-update-form-cont inc-update-cont'>
        <form onSubmit={handleSubmit}>
          <div className="col-12 inc-update-title"> Update Income Tax rates: </div>

          <div className="form-row row">
            <div className="form-group col-md-4">
              <label htmlFor="salary">Male condition1:</label>
              <input type="number" className="form-control inc-update-inp" id="salary" name='salary' placeholder={incVariables.maleCondition1} onChange={(e) => setMaleCond1(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Female condition1: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.femaleCondition1} onChange={(e) => setFemaleCond1(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Freedom-fighter condition1: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.fighterCondition1} onChange={(e) => setFighterCond1(e.target.value)} />
            </div>
          </div>

          <div className="form-row row">
            <div className="form-group col-md-4">
              <label htmlFor="salary">Male condition2:</label>
              <input type="number" className="form-control inc-update-inp" id="salary" name='salary' placeholder={incVariables.maleCondition2} onChange={(e) => setMaleCond2(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Female condition2: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.femaleCondition2} onChange={(e) => setFemaleCond2(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Freedom-fighter condition2: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.fighterCondition2} onChange={(e) => setFighterCond2(e.target.value)} />
            </div>
          </div>

          <div className="form-row row">
            <div className="form-group col-md-4">
              <label htmlFor="salary">Male condition3:</label>
              <input type="number" className="form-control inc-update-inp" id="salary" name='salary' placeholder={incVariables.maleCondition3} onChange={(e) => setMaleCond3(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Female condition3: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.femaleCondition3} onChange={(e) => setFemaleCond3(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Freedom-fighter condition3: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.fighterCondition3} onChange={(e) => setFighterCond3(e.target.value)} />
            </div>
          </div>

          <div className="form-row row">
            <div className="form-group col-md-4">
              <label htmlFor="salary">Male condition4:</label>
              <input type="number" className="form-control inc-update-inp" id="salary" name='salary' placeholder={incVariables.maleCondition4} onChange={(e) => setMaleCond4(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Female condition4: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.femaleCondition4} onChange={(e) => setFemaleCond4(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Freedom-fighter condition4: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.fighterCondition4} onChange={(e) => setFighterCond4(e.target.value)} />
            </div>
          </div>

          <div className="form-row row">
            <div className="form-group col-md-4">
              <label htmlFor="salary">Male condition5:</label>
              <input type="number" className="form-control inc-update-inp" id="salary" name='salary' placeholder={incVariables.maleCondition5} onChange={(e) => setMaleCond5(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Female condition5: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.femaleCondition5} onChange={(e) => setFemaleCond5(e.target.value)} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="months_num"> Freedom-fighter condition5: </label>
              <input type="number" className="form-control inc-update-inp" id="months_num" name='months_num' placeholder={incVariables.fighterCondition5} onChange={(e) => setFighterCond5(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary inc-update">
            Update
          </button>

        </form>
      </div>

      <div className="admin-contact-cont">
        <div className="admin-contact-form-container" >
          <h2>Message to user</h2>
          <form onSubmit={handleMessageSubmit} id="admin-contact-form">
          <label>
              User Email:
              <input
                type="text"
                name="email"
                //value={formData.email}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Admin Name:
              <input
                type="text"
                name="fullName"
                //value={formData.email}
                onChange={(e) => setAdminName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Topic:
              <input
                type="text"
                name="topic"
                //value={formData.name}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </label>
            <br />

            <label>
              Message:
              <textarea
                name="message"
                //value={formData.message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

    </>
  );
};

export default AdminDashboard;