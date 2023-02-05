import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from "react-slider";
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
        // 'kraken',
        // 'mermaid',
        // 'banshee',
        // 'hades',
        // 'jackalope',
        // 'nymph',
        // 'frog',
        // 'crab',
        // 'leopard',
        // 'hamster',
        // 'dinosaur',
        // 'whale',
        // 'pig',
        'hulk',
        'groot',
        'batgirl',
        'wonderwoman',
        'batman',
        'spiderman',
        'nick_fury',
        'joker',
      ]
    
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

      const updateProfile = () => {
        //save changes
        console.log('about to save changes!')
        event.preventDefault();
        if (username) {
            dispatch({
              type: 'UPDATE_USER',
              payload: {
                username: username,
                age: age,
                avatar: selectedAvatar,
                type: props.user.type,
                id: props.user.id,
              },
            });
          } else {
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
          }
        setEditProfile(!editProfile);
      }

      const imgClick = (avatar) => {
        console.log('you clicked on the image!');
        setSelectedAvatar(avatar)
      }

      const onCancel = () => {
        setSelectedAvatar(props.user.avatar);
        setEditProfile(!editProfile);
      }

    const UserProfile = () => {
        return (
            <div className="user-profile-main">
                <div className={`${editProfile ? 'user-profile-header edit': 'user-profile-header'}`}>
                    <div className="menu-profile-image">                            
                        { editProfile ? 
                                 avatars.map(avatar => {
                                    return(
                                        <div className="image-container">
                                            <button
                                                className={`${avatar === selectedAvatar ? 'selected-image' : 'image'}`} 
                                                onClick={() => imgClick(avatar)} >
                                                <img src={`/images/profile/${avatar}.png`}/>
                                            </button>
                                        </div>
                                    )
                                 })                            
                            :                          
                                <div>
                                    <img src={`/images/profile/${props.user.avatar}.png`}/>                            
                                </div> 
                        }
                    </div>
                </div>
                
                <div className="user-profile-body">
                    <form className="user-update-form" onSubmit={updateProfile}>
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
                            <div className={`${editProfile ? 'form-row age edit': 'form-row age'}`}>
                                <div className="age-slider-title">Age:</div>
                                <div className="age-slider-value">
                                    <Slider disabled={!editProfile}/>
                                </div>                                                      
                            </div>
                            <div className="form-row update-button">
                                <>
                                { editProfile ?
                                    <div className="on-change-buttons">
                                        <button className="green-button save" onClick={updateProfile}>Save</button>
                                        <button className="green-button cancel" onClick={onCancel}>Cancel</button>
                                    </div>
                                : <button className="green-button update" onClick={()=>setEditProfile(!editProfile)}>Edit Profile</button>
                                }                                    
                                </>                                
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        )
    }

    return (
        <div className="user-profile">
            <h1 className="user-profile-title">User Profile</h1>
            <Card className="user-profile-container" component={<UserProfile />} />
        </div>
    )
}

export default UserProfile;