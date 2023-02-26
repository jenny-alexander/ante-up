import React from 'react';
import './RegisterPage.scss';
import Card from '../Common/Card/Card';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const navigate = useNavigate();

  return (
      <div className="register-page">
        <div className="register-card">
          <Card component={<RegisterForm />} />
        </div>
      </div>
    );
}

export default RegisterPage;
