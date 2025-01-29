import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from "react-slider";
import { useNavigate } from 'react-router-dom';
import './RegisterForm.scss';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('Child');  
  const [age, setAge] = useState(10);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({type:'CLEAR_REGISTRATION_ERROR'});
  },[]);

  const registerUser = (event) => {
    event.preventDefault();
    if (username && password) {       
      if (username.length < 8) {
        dispatch({ type: 'REGISTRATION_USERNAME_LENGTH_ERROR' });
      } else if (password.length < 8) {
        dispatch({ type: 'REGISTRATION_PASSWORD_LENGTH_ERROR' });
      } else {
        dispatch({
          type: 'REGISTER',
          payload: {
            username: username,
            password: password,
            age: age,
            type: profileType,
          },
        });
        navigate('/dashboard');
      }
    } else {      
      dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  };

  const Slider = () => {
    return (
      <ReactSlider
          className="customSlider"
          thumbClassName="customSlider-thumb"
          trackClassName="customSlider-track"          
          marks
          min={5}
          max={17}            
          value={age}
          onAfterChange={(age) => setAge(age)}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
    )
  }

  return (    
    <div className="registration-form">
      <form onSubmit={registerUser}>        
        <div className="register-title">Let's Get Started!</div>
        <div className="form-body">          
            {errors.registrationMessage
              && (<div className="registration-error" role="alert">{errors.registrationMessage}</div>)
            }                    
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
          {
            profileType === 'Child' ? 
            ( <div className="form-row age-slider">
                <div className="age-slider-title">How old are you today?</div>             
                  <Slider />                 
              </div> ): null
          }
          <div className="form-row">
            <button type="submit" className="green-button register">Register</button>
          </div>
          <div className="already-registered">
            <p>Already have an account?</p>
            <button type="button" className="white-button register"onClick={() => {                
                navigate('/login');
              }} >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;