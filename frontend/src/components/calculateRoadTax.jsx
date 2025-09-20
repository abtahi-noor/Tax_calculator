import { useState} from "react";
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { useNavigate } from "react-router-dom";
import {UserContext} from "../userContext";


function CalculateRoadTax() {
    //const navigate = useNavigate();
    const {u, setU} = useContext(UserContext);
    console.log(u)

    const [cc, setCc] = useState()
    const [seatNum, setSeatNum] = useState()

    const [roadTax, setRoadTax] = useState(-1)

    const handleSubmit = (e) => {  // form submit
        e.preventDefault()
        //console.log(salary)

        axios.post('http://localhost:5000/calculateRoadTax', { cc, seatNum }) // sending json body to server for calculating tax        
          .then((result) => {
            setRoadTax(result.data);
            console.log(result.data)  // showing response which came back from the server
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
                        <Link to='/login' className="nav-link" style={{ backgroundColor: '#FF0000' }} onClick={() => setU(null)}>
                            Log Out
                        </Link>                     
                    </div>
                </div>
            </nav>

            <div className='form-cont'>
                <form className="inc-form" onSubmit={handleSubmit}>

                    <div className="form-group row">
                        <label htmlFor="rent" className="col-sm-2 col-form-label">Vehicle CC:</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control inc-inp" id="rent" name='cc' placeholder="Vehicle CC" onChange={(e) => setCc(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="medical" className="col-sm-2 col-form-label">Number of seats:</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control inc-inp" id="medical" name='seatNum' placeholder="Number of seats" onChange={(e) => setSeatNum(e.target.value)} />
                        </div>
                    </div>
  
                <div className="result-row">
                        <button type="submit" className="btn btn-primary">Calculate</button>

                        {
                            (roadTax>=0)? (
                                <div className="show-cont">
                                    <div className="show">
                                        Total Road Tax: {roadTax}
                                    </div>   
                                </div>
                            ) : (
                                <></>
                            )
                        }

                </div>

                </form>                
            </div>     
        </>  
    )
}

export default CalculateRoadTax;