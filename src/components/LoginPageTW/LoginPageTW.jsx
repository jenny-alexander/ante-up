import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPageTW() {
  const history = useHistory();

  return (
    // <div class="relative flex flex-col justify-center overflow-hidden py-6 md:py-12">
    //   <div class="relative bg-emerald-50 px-6 py-6 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-xl">
    //     <div class="mx-auto max-w-xl">
    //       <div class="divide-y divide-gray-300/50">
    //         <div class="space-y-6 py-4 text-base leading-7 text-gray-600">
    //           <p>Login to Ante Up!</p>
    //           <ul class="space-y-4">
    //             <li class="flex items-center">
    //               <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
    //                 <circle cx="12" cy="12" r="11" />
    //                 <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    //               </svg>
    //               <p class="ml-4">
    //                 Customizing your
    //                 <code class="text-sm font-bold text-gray-900">tailwind.config.js</code> file
    //               </p>
    //             </li>
    //             <li class="flex items-center">
    //               <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
    //                 <circle cx="12" cy="12" r="11" />
    //                 <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    //               </svg>
    //               <p class="ml-4">
    //                 Extracting classes with
    //                 <code class="text-sm font-bold text-gray-900">@apply</code>
    //               </p>
    //             </li>
    //             <li class="flex items-center">
    //               <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
    //                 <circle cx="12" cy="12" r="11" />
    //                 <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    //               </svg>
    //               <p class="ml-4">Code completion with instant preview</p>
    //             </li>
    //           </ul>
    //           <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
    //         </div>
    //         <div class="pt-8 text-base font-semibold leading-7">
    //           <p class="text-gray-900">Want to dig deeper into Tailwind?</p>
    //           <p>
    //             <a href="https://tailwindcss.com/docs" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="relative flex-col justify-center w-full max-w-md">
    <div className="relative flex-col justify-center w-full max-w-md">

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="pb-4 text-lg">Sign into Ante Up!</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Min 8 characters" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded">Login</button>
        </div>
        <div className="flex pt-4">
          <p className="text-sm pr-2">Not yet registered?</p>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" >
            Create an account
          </a>
        </div>
      </form>
    </div>

  );
}

export default LoginPageTW;
