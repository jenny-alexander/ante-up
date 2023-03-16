import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.scss';
import Card from '../Common/Card/Card';

function LoginPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <div className="login-page">
      { windowWidth < 651 ? 
          <div className="login-logo">
            <img className="logo" src="images/ante_up_welcome.png" alt="ante up logo"></img>
          </div>
        : null
      }
      <div className="login-card">
        <Card component={<LoginForm />} />
      </div>      
    </div>
  );
}

export default LoginPage;
