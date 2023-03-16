import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.scss';
import Card from '../Common/Card/Card';

function LoginPage() {

  return (
    <div className="login-page">
      <div className="login-card">
        <Card component={<LoginForm />} />
      </div>      
    </div>
  );
}

export default LoginPage;
