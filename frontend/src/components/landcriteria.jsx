import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";

const LandCriteria = () => {
  const navigate = useNavigate();
  const { u } = useContext(UserContext);
  console.log(u)
  useEffect(() => {
    if (u == null) {
      navigate("/login");
    }
  }, [u, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ backgroundColor: '#8FBC8F', border: '1px solid #ddd', padding: '20px', borderRadius: '80px', maxWidth: '80%', margin: 'auto' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Land Criteria</h2>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '20%' }} scope="col">Land Origin</th>
              <th style={{ width: '80%' }} scope="col">Areas Under</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: '#C1E1C1' }}>
              <td>Ka</td>
              <td>Dhaka, Chittagong, Narayangonj, Sylhet</td>
            </tr>
            <tr style={{ backgroundColor: '#A7D7A7' }}>
              <td>Kha</td>
              <td>Rajshahi, Khulna, Barishal, Comilla, Barishal</td>
            </tr>
            <tr style={{ backgroundColor: '#C1E1C1' }}>
              <td>Ga</td>
              <td>Mymenshingh, Tangail, Faridpur, Bogura, Dinajpur, Kushtia, Jesshore, Patuakhali</td>
            </tr>
            <tr style={{ backgroundColor: '#A7D7A7' }}>
              <td>Gha</td>
              <td>Other Zilla Sadar Municipal Areas</td>
            </tr>
            <tr style={{ backgroundColor: '#C1E1C1' }}>
              <td>Umo</td>
              <td> All Other Municipal Aeras</td>
            </tr>
            <tr style={{ backgroundColor: '#A7D7A7' }}>
              <td>Cha</td>
              <td>Areas that are yet to be declared under Municipality</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link style={{ color: '#333' }} to="/calculatelandtax"> Back </Link>
    </div>
  );
};

export default LandCriteria;
