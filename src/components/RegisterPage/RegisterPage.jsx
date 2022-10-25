import React from 'react';
import './RegisterPage.scss';
import Card from '../Common/Card/Card';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
      <div className="register-page">
        <div className="register-card">
          <Card component={<RegisterForm />} />
        </div>
      </div>
    );


  //   <div>
  //     <RegisterForm />
  //   </div>
  // );
}

export default RegisterPage;
