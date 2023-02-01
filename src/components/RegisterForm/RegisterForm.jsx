import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from "react-slider";
import { useNavigate } from 'react-router-dom';
import './RegisterForm.scss';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('Parent');  
  const [age, setAge] = useState(10);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();    
    console.log('values in register are:', username, password, age, profileType)
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        age: age,
        type: profileType,
      },
    });
  };

  const onProfileChangeValue = (event) => {
    setProfileType(event.target.value);    
  }

  const Slider = () => {
    return (
      <ReactSlider
          className="customSlider"
          thumbClassName="customSlider-thumb"
          trackClassName="customSlider-track"
          //markClassName="customSlider-mark"
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
            <div className="input-radio-title">Profile Type:</div>
            <div className="input-group-radio">
              
              <div className="input-radio-buttons" onChange={onProfileChangeValue}>
              <div className="radio-input">
                  <label><input type="radio" value="Parent" name="profile" checked={profileType === "Parent"}/>Parent</label>
                </div>  
                <div className="radio-input">
                  <label><input type="radio" value="Child" name="profile" checked={profileType === "Child"} />Child</label>
                </div>
 
              </div>
            </div>            
          </div>
          {
            profileType === 'Child' ? 
            ( <div className="form-row age-slider">
                <div className="age-slider-title">How old are you?</div>             
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