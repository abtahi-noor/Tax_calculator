import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './css/Home.css';
import './css/AdminDashboard.css';
import './css/IncomeTaxCalc.css';
import './css/login.css';
import './css/userProfile.css';
import './css/Notifications.css';
import './css/userMessages.css';
import './css/adminMessages.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
