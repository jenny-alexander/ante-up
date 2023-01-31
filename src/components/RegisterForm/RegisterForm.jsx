import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.scss';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('Child');
  //const [gender, setGender] = useState("Male");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  //const history = useHistory();
  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();    

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  };

  const handleProfileChange = (event) => {
    console.log('you clicked on a radio button with:', event.target.value);
  }
  const onChangeValue = (event) => {
    setProfileType(event.target.value);
    console.log(event.target.value);
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
              
              <div className="input-radio-buttons" onChange={onChangeValue}>
                <div className="radio-input">
                  <label><input type="radio" value="Child" name="profile" checked={profileType === "Child"} />Child</label>
                </div>
                <div className="radio-input">
                  <label><input type="radio" value="Parent" name="profile" checked={profileType === "Parent"}/>Parent</label>
                </div>   
              </div>
            </div>            
          </div>
          <div className="form-row">
            <button type="submit" className="green-button register">Register</button>
          </div>
          <div className="already-registered">
            <p>Already have an account?</p>
            <button type="button" className="white-button register"onClick={() => {
                //history.push('/login');
                navigate('/login');
              }} >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>


















    // <div className="relative flex-col justify-center mx-auto w-full max-w-md pt-10">
    //   <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={registerUser}>
    //     {/* <p className="font-Biryani text-3xl text-blue-900 pb-6">ANTE UP!</p> */}
    //     <p className="pb-0 font-bold text-xl text-left">Let's Get Started!</p>
    //     <div className="flex pt-1">
    //       <p className="text-sm pr-1">Already have an Ante Up account?</p>
    //       <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
    //         onClick={() => {
    //           history.push('/login');
    //         }} >
    //         Log in.
    //       </button>
    //     </div>
    //     <div className="mb-4 pt-10">
    //       <label className="block text-gray-700 text-sm font-base mb-2" for="username">
    //         Username
    //       </label>
    //       <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Min 8 characters"
    //         value={username}
    //         onChange={(event) => setUsername(event.target.value)}
    //         required />
    //     </div>
    //     <div className="mb-6">
    //       <label className="block text-gray-700 text-sm font-base mb-2" for="password">
    //         Password
    //       </label>
    //       <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********"
    //         value={password}
    //         onChange={(event) => setPassword(event.target.value)}
    //         required />
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded">Register</button>
    //     </div>
    //   </form>
    // </div>
  );
}

export default RegisterForm;
