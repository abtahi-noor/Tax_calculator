//import { useState } from "react";
import { Link } from 'react-router-dom';
//import axios from 'axios';
//import { useNavigate } from "react-router-dom";
import income_tax_image from "../images/incomeTax.jpg";
import land_tax_image from "../images/landTax.jpg";
import road_tax_image from "../images/roadTax.jpg";


function Home() {
    return (
        <>
            <nav>
                <div className="nav-title" href="#">
                    Tax Calculator
                </div>
                <div className="nav-items" >
                    <div className="nav-item">
                        <Link to='/' className="nav-link active">
                            Home
                        </Link>      
                    </div>
                    <div className="nav-item">
                        <Link to='/login' className="nav-link">
                            Login
                        </Link>      
                    </div>
                    <div className="nav-item">
                        <Link to='/signup' className="nav-link">
                            Sign Up
                        </Link>                     
                    </div>
                </div>
            </nav>

            <div className='home-container'>
                <div className='tax-types'>
                    <div className='tax-type'>
                        
                        <img src={income_tax_image} alt="income-tax"  />
                        <Link to='/IncomeTaxCalc' className='overlay'>
                                Calculate <br/> Income Tax     
                        </Link>
                    </div>
                    <div className='tax-type'>
                        <img src={land_tax_image} alt="income-tax"  />
                        <Link to='/calculatelandtax' className='overlay'>
                            Calculate <br/> Land Tax
                        </Link>
                    </div>
                    <div className='tax-type'>
                        <img src={road_tax_image} alt="income-tax"  />
                        <Link to='/calculateRoadTax' className='overlay'>
                            Calculate <br/> Road Tax
                        </Link>
                    </div>
                </div>
            </div>

            {/*<div className='cont'>

            </div>*/}
        </>
        
    )
}

export default Home;