import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    console.log('in registerUser with:', username, password);

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <div>Registration form</div>
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
