import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Ante Up');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h1 className="font-bold text-lg">{heading}</h1>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            The all-in-one allowance and chore manager for families!
          </p>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          {/* <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
