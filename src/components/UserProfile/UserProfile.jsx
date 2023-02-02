import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from "react-slider";
import Card from '../Common/Card/Card'
import './UserProfile.scss';

function UserProfile(props) {
    const [username, setUsername] = useState(props.user.username);    
    const [age, setAge] = useState(props.user.age);
    const [editProfile, setEditProfile] = useState(false)
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('!!!! my props are:', props);
    },[])

      const updateUser = () => {
        console.log('updateUser')
      }
    
      const Slider = (props) => {
        return (
          <ReactSlider
              className="customSlider"
              thumbClassName="customSlider-thumb"
              trackClassName="customSlider-track"
              marks
              min={5}
              max={17}            
              value={age}
              disabled={props.disabled}
              onAfterChange={(age) => setAge(age)}
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
        )
      }

      const changeProfile = () => {
        setEditProfile(!editProfile);
      }

    const UserProfile = () => {
        return (
            <>
                <div className="user-profile-header">
                    <img className="menu-profile-image" src="/images/profile/kraken-xlarge.png"/>
                    {/* <div>
                        <button className="white-button">Change Avatar</button>
                    </div> */}
                </div>
                <div className="user-profile-body">
                    <form className="user-update-form" onSubmit={updateUser}>
                        <div className="form-body">
                            <div className="form-row username">
                                <div className= "input-group">
                                    <label for="username">
                                        Username
                                    </label>
                                    <input id="username" type="text"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        disabled={!editProfile}
                                        required />
                                    </div>
                                </div>
                            <div className="form-row age">
                                <div className="age-slider-title">Age:</div>
                                <div className="age-slider-value">
                                    <Slider disabled={!editProfile}/>
                                </div>                                                      
                                </div>
                            <div className="form-row update-button">
                                <button className="green-button update" onClick={changeProfile}>Edit Profile</button>
                            </div>
                        </div>
                    </form> 
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