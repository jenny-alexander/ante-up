import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from "react-slider";
import Card from '../Common/Card/Card'
import './UserProfile.scss';

function UserProfile(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profileType, setProfileType] = useState('');  
    const [age, setAge] = useState(10);
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('!!!! my props are:', props);
    },[])

    const onProfileChangeValue = (event) => {
        setProfileType(event.target.value);    
      }

      const updateUser = () => {
        console.log('updateUser')
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

    const UserProfile = () => {
        return (
            <>
                <div className="user-profile-header">
                    <img className="menu-profile-image" src="/images/profile/hades-xlarge.png"/>
                    <div>
                        <button className="white-button">Change Avatar</button>
                    </div>
                </div>
                <div className="user-profile-body">                    
                    <div className="user-update-form">
                         <form onSubmit={updateUser}>
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
                            
                                <div className="form-row age-slider">
                                    <div className="age-slider-title">How old are you?</div>             
                                    <Slider />                 
                                </div> 
                            <div className="form-row">
                                <button type="submit" className="green-button update">Update</button>
                            </div>
                            {/* <div className="already-registered">
                                <p>Already have an account?</p>
                                <button type="button" className="white-button register"onClick={() => {                
                                    navigate('/login');
                                }} >
                                Login
                                </button>
                            </div> */}
                            </div>
                        </form> 
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="user-profile">
            <h1 className="user-profile-title">User Profile</h1>
            {/* <div className="user-profile-container">                 */}
            <Card className="user-profile-container" component={<UserProfile />} />
            {/* </div> */}
        </div>
    )
}

export default UserProfile;