import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Card from '../Common/Card/Card'
import './UserProfile.scss';

function UserProfile(props) {
    const [username, setUsername] = useState(props.user.username);    
    const [age, setAge] = useState(props.user.age);
    const [editProfile, setEditProfile] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(props.user.avatar);
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();


    const avatars = [
        'kraken',
        'mermaid',
        'banshee',
        'hades',
        'jackalope',
        'nymph',
      ]

      const updateUser = () => {
        console.log('updateUser')
      }

      useEffect(() => {
        console.log('BOW WOW props are:', props);
      },[])
    
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

      const imgClick = (avatar) => {
        console.log('you clicked on the image!');
        setSelectedAvatar(avatar)
      }

    const UserProfile = () => {
        return (
            <>
                <div className={`${editProfile ? 'user-profile-header edit': 'user-profile-header'}`}>
                    <div className="menu-profile-image">                            
                        { editProfile ? 
                                
                                 avatars.map(avatar => {
                                    return (
                                        avatar === selectedAvatar ? (
                                            <img onClick={() => imgClick()} className="selected-image" src={`/images/profile/${avatar}-xlarge.png`}/>
                                        ) : <img onClick={() => imgClick(avatar)} src={`/images/profile/${avatar}-xlarge.png`}/>  
                                    )
                                 })                            
                            :                          
                                <div>
                                    <img src={`/images/profile/${props.user.avatar}-xlarge.png`}/>                            
                                </div> 
                        }
                    </div>
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
                            <div className="form-row profile-type">
                                <div className="profile-type-title">Profile Type:</div>
                                <div className="profile-type-value">
                                    {props.user.type}
                                </div>                                                      
                            </div>    
                            <div className="form-row age">
                                <div className="age-slider-title">Age:</div>
                                <div className="age-slider-value">
                                    <Slider disabled={!editProfile}/>
                                </div>                                                      
                            </div>
                            <div className="form-row update-button">
                                <>
                                { editProfile ?
                                    <div className="on-change-buttons">
                                        <button className="green-button save">Save</button>
                                        <button className="green-button cancel" onClick={changeProfile}>Cancel</button>
                                    </div>
                                : <button className="green-button update" onClick={changeProfile}>Edit Profile</button>
                                }                                    
                                </>                                
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