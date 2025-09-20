import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";

function PaymentGateway() {
  const navigate = useNavigate();
  const { u, setU } = useContext(UserContext);
  const [taxInfo, setTaxInfo] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  useEffect(() => {
    if (u == null) {
      navigate("/login");
    }
  }, [u, navigate]);

  const email = useState(u);


  useEffect(() => {
    // Fetch user messages based on the provided email address
    axios
        .get(`http://localhost:5000/taxInfo/${u}`)
        .then((response) => {
            setTaxInfo(response.data);
        })
        .catch((err) => console.log(err));

      // Fetch saved cards for the user
      axios
        .get(`http://localhost:5000/cards/${u}`)
        .then((response) => {
            setCards(response.data);
        })
        .catch((err) => console.log(err));
  }, [u, email]);

  

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handlePayment = () => {
    // Update tax status to 'completed'
    axios.post(`http://localhost:5000/taxInfo/${u}`, { status: "completed" }).then(() => {
      setPaymentStatus("Payment Completed");
      // Redirect to '/userProfile' after a delay
      setTimeout(() => {
        navigate("/userProfile");
      }, 1000);
    });
  };

  return (
    <>
    <nav>
      <div className="nav-title" href="#">
        Tax Calculator
      </div>
      <div className="nav-items">
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

    <div style={{ backgroundColor: "#ffffff", padding: "20px", marginBottom: "100px", width: "800px", borderRadius: "8px" }}></div>



  
    <div style={{ marginTop: '20px', display: "flex", flexDirection: "column", alignItems: "center", margin: "20px" }}>
      {/* User Details */}
      {taxInfo && (
        <div style={{ backgroundColor: "#f0f0f0", padding: "80px", marginBottom: "20px", width: "900px", borderRadius: "8px" }}>
          <h2>{`Tax Details for:  ${taxInfo.firstName} ${taxInfo.lastName}`}</h2>
          <p>Email: {taxInfo.email}</p>
          <p>Income Tax: {taxInfo.incomeTax} Taka </p>
          <p>Land Tax: {taxInfo.landTax} Taka </p>
          <p>Road Tax: {taxInfo.roadTax} Taka </p>
          <p>Total Taxes: {taxInfo.incomeTax + taxInfo.landTax + taxInfo.roadTax} Taka </p>
        </div>
      )}

      {/* Payment Cards */}
      <div style={{ backgroundColor: "#ffffff", padding: "20px", marginBottom: "20px", width: "800px", borderRadius: "8px" }}>
        {cards.length > 0 ? (
          <div>
            <h3>Select Payment Card:</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {cards.map((card) => (
                  <tr key={card._id}>
                    <td>
                      <input
                        type="radio"
                        name="card"
                        onChange={() => handleCardSelect(card)}
                      />
                    </td>
                    <td>{card.cardName}</td>
                    <td>**** **** **** {card.cardNum.toString().slice(-4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handlePayment} disabled={!selectedCard} style={{ marginTop: "10px", padding: "8px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
              Pay
            </button>
          </div>
        ) : (
          <div>
            <p>No payment cards saved.</p>
            <button style={{ padding: "8px", cursor: "pointer", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "4px" }} onClick={() => navigate("/addcardinformation")}>
              Add Card
            </button>
          </div>
        )}
      </div>
  
      {/* Payment Status */}
      <div style={{ backgroundColor: "#f0f0f0", padding: "20px", width: "300px", borderRadius: "8px" }}>
        {paymentStatus && <p>{paymentStatus}</p>}
      </div>
    </div>
  </>
  
  );
}

export default PaymentGateway;
