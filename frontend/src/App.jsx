//import {useState} from 'react'
import "bootstrap/dist/css/bootstrap.css" // updated
import React, { useState, useMemo } from 'react';
//import {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from "./components/Signup.jsx"
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import AddProfileInformation from './components/addProfileInformation.jsx';
import IncomeTaxCalc from "./components/IncomeTaxCalc.jsx";
import AuthZone from "./components/AuthZone.jsx";
import ViewUsers from "./components/viewUsers.jsx";
import UserProfile from "./components/userProfile.jsx";
import UpdateProfile from "./components/updateProfile.jsx";
import CalculateLandTax from "./components/calculateLandTax.jsx";
import LandCriteria from "./components/landcriteria.jsx";
import AdminDashboard from "./components/admindashboard.jsx";
import Notifications from "./components/Notifications.jsx";
import { UserContext } from "./userContext.jsx";
import UserMessages from "./components/userMessages.jsx";
import AdminMessages from "./components/adminMessages.jsx";
import AddCardInformation from "./components/addCardInformation.jsx";
import UpdateCardInformation from "./components/updateCardInformation.jsx";
import PaymentGateway from "./components/paymentGateway.jsx";
import SecurityKey from "./components/securityKey.jsx";
import ChangePassword from "./components/changePassword.jsx";
import CalculateRoadTax from "./components/calculateRoadTax.jsx";

//import {createContext} from 'react'

//const UserContext = createContext()

function App() {

  const [u, setU] = useState(null);
  const value = useMemo(() => ({ u, setU }), [u, setU]);

  //useEffect(() => {
  //  const u_storage = localStorage.getItem("u");
  //  console.log("u_storage:", u_storage)
  //  if( u === "" ){
  //    setU(JSON.parse(u_storage));
  //  }
  //}, [u])

  //useEffect(() => {
  //  localStorage.setItem("u", JSON.stringify(u));
  //}, [u])

  return (
    // redirecting to different components/page based on route
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Routes>

          <Route path='/' element={<Home />} >  </Route>
          <Route path='/signup' element={<Signup />} >  </Route>
          <Route path='/login' element={<Login />} >  </Route>
          <Route path='/home' element={<Home />} >  </Route>
          <Route path='/addProfileInformation' element={<AddProfileInformation />} >  </Route>
          <Route path='/IncomeTaxCalc' element={<IncomeTaxCalc />} >  </Route>
          <Route path='/AuthZone' element={<AuthZone />} >  </Route>
          <Route path='/viewUsers' element={<ViewUsers />} >  </Route>
          <Route path='/userProfile' element={<UserProfile />} >  </Route>
          <Route path='/updateProfile' element={<UpdateProfile />} >  </Route>
          <Route path='/calculatelandtax' element={<CalculateLandTax />} >  </Route>
          <Route path='/landcriteria' element={<LandCriteria />} >  </Route>
          <Route path='/admindashboard' element={<AdminDashboard />} >  </Route>
          <Route path='/notifications' element={<Notifications />} >  </Route>
          <Route path='/userMessages' element={<UserMessages />} >  </Route>
          <Route path='/adminMessages' element={<AdminMessages />} >  </Route>
          <Route path='/addCardInformation' element={<AddCardInformation />} >  </Route>
          <Route path='/updateCardInformation' element={<UpdateCardInformation />} >  </Route>
          <Route path='/paymentGateway' element={<PaymentGateway />} >  </Route>
          <Route path='/securityKey' element={<SecurityKey />} >  </Route>
          <Route path='/changePassword' element={<ChangePassword />} >  </Route>
          <Route path='/calculateRoadTax' element={<CalculateRoadTax />} >  </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
