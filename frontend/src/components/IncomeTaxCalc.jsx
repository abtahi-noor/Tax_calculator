import { useState} from "react";
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { useNavigate } from "react-router-dom";
import {UserContext} from "../userContext";


function IncomeTaxCalc() {
    //const navigate = useNavigate();
    const {u, setU} = useContext(UserContext);
    console.log(u)
    //useEffect(() => {
    //  if (u == null) {
    //    navigate("/login");
    //  }
    //}, [u, navigate]);

    const [salary, setSalary] = useState()
    const [months_num, setMonths_num] = useState()
    const [rent, setRent] = useState()
    const [medical, setMedical] = useState()
    const [transport, setTransport] = useState()
    const [conveyance, setConveyance] = useState()
    const [incentive, setIncentive] = useState()
    const [bonus, setBonus] = useState()
    const [bonus_num, setBonus_num] = useState()

    const [radio, setRadio] = useState("male")  // radio by default male

    const [incomeTax, setIncomeTax] = useState(-1)

    const radioChange = (e) => {
        //console.log(radio);
        setRadio(e.target.value);
    }

    const handleSubmit = (e) => {  // form submit
        e.preventDefault()
        //console.log(salary)
        //console.log(months_num)
        //console.log(rent)
        //console.log(medical)
        //console.log(transport)
        //console.log(conveyance)
        //console.log(incentive)
        //console.log(bonus)
        //console.log(bonus_num)
        //console.log(radio);

        axios.post('http://localhost:5000/incomeTaxCalc', { salary, months_num, rent, medical, transport, conveyance, incentive, bonus, bonus_num, radio }) // sending json body to server for calculating tax        
          .then((result) => {
            setIncomeTax(result.data);
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

                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="salary">Basic Salary:</label>
                            <input type="number" className="form-control inc-inp" id="salary" name='salary' placeholder="Basic Salary (monthly)" onChange={(e) => setSalary(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="months_num"> Number of Months: </label>
                            <input type="number" className="form-control inc-inp" id="months_num" name='months_num' placeholder="Number of Months" onChange={(e) => setMonths_num(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="rent" className="col-sm-2 col-form-label">House Rent:</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control inc-inp" id="rent" name='rent' placeholder="House Rent (monthly)" onChange={(e) => setRent(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="medical" className="col-sm-2 col-form-label">Medical:</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control inc-inp" id="medical" name='medical' placeholder="Medical (monthly)" onChange={(e) => setMedical(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="transport" className="col-sm-2 col-form-label">Transport:</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control inc-inp" id="transport" name='transport' placeholder="Transport (monthly)" onChange={(e) => setTransport(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="conveyance" className="col-sm-2 col-form-label">Conveyance:</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control inc-inp" id="conveyance" name='conveyance' placeholder="Conveyance (monthly)" onChange={(e) => setConveyance(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="incentive" className="col-sm-2 col-form-label">Incentive:</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control inc-inp" id="incentive" name='incentive' placeholder="Incentive (monthly)" onChange={(e) => setIncentive(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="bonus">Festival Bonus:</label>
                            <input type="number" className="form-control inc-inp" id="bonus" name='bonus' placeholder="Festival Bonus" onChange={(e) => setBonus(e.target.value)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="bonus_num"> Number of Bonus: </label>
                            <input type="number" className="form-control inc-inp" id="bonus_num" name='bonus_num' placeholder="Number of bonus" onChange={(e) => setBonus_num(e.target.value)} />
                        </div>
                    </div>

                    <fieldset className="form-group">
                        <div className="row">
                        <legend className="col-form-label col-sm-2 pt-0">Select an option:</legend>
                            <div className="col-sm-10">
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="radio" id="gridRadios1" value="male" checked={radio==='male'} onChange={radioChange} /> 
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    Male
                                </label>
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="radio" id="gridRadios2" value="female" checked={radio==='female'} onChange={radioChange}  />
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Female or age over 65
                                </label>
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="radio" id="gridRadios3" value="fighter" checked={radio==='fighter'} onChange={radioChange} />
                                <label className="form-check-label" htmlFor="gridRadios3">
                                    Freedom Fighter (Gazated)
                                </label>
                                </div>
                            </div>
                        </div>   
                    </fieldset>
                    {/*<p> Selected radio is: {radio} </p>*/}

  
                <div className="result-row">
                        <button type="submit" className="btn btn-primary">Calculate</button>

                        {
                            (incomeTax>=0)? (
                                <div className="show-cont">
                                    <div className="show">
                                        Total Income Tax: {incomeTax}
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

export default IncomeTaxCalc;