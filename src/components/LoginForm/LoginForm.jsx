import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({type:'CLEAR_LOGIN_ERROR'});
  },[]); 

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
        if (username.length < 8) {
          dispatch({ type: 'LOGIN_USERNAME_LENGTH_ERROR' });
        } else if (password.length < 8) {
          dispatch({ type: 'LOGIN_PASSWORD_LENGTH_ERROR' });
        } else {
          dispatch({
            type: 'LOGIN',
            payload: {
              username: username,
              password: password,
            },        
        });
        navigate('/dashboard');
      }
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={login}>        
        <div className="login-title">Log in to AnteUp</div>

        <div className="form-body">
        {errors.loginMessage && (
          <div className="login-error" role="alert">
            {errors.loginMessage}
          </div>
          )}
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
            <button type="submit" className="green-button login">Login</button>
          </div>
          <div className="not-registered">
            <p>Not yet registered?</p>
            <button type="button" className="white-button register" onClick={() => {                
                navigate('/registration');
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
