import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.scss';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    console.log('in login with:', username, password);

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    
    <div className="login-form">
      <form onSubmit={login}>
        {/* <p className="font-Biryani text-3xl text-blue-900 pb-6">ANTE UP!</p> */}
        <div className="login-title">Log in to AnteUp</div>

        <div className="form-body">
          <div className="form-row">
            <div className= "input-group">
              <label for="username">
                Username
              </label>
              <input id="username" type="text" placeholder="Min 8 characters"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label for="password">
                Password
              </label>
              <input id="password" type="password" placeholder="********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required />              
            </div>
          </div>
          <div className="form-row">
            <button className="green-button login">Login</button>
          </div>
          <div className="not-registered">
            <p>Not yet registered?</p>
            <button className="white-button register" onClick={() => {
                history.push('/registration');
              }} >
              Register here
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
