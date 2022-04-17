import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    <div className="relative flex-col justify-center mx-auto w-full max-w-md pt-10">
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={login}>
        <p className="pb-8 font-bold text-xl text-left">Sign into Ante Up!</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-base mb-2" for="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Min 8 characters"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-base mb-2" for="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required />
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded">Login</button>
        </div>
        <div className="flex pt-8">
          <p className="text-sm pr-1">Not yet registered?</p>
          <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={() => {
              history.push('/registration');
            }} >
            Register here.
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
