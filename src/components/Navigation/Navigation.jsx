import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Navigation(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div className="flex items-center justify-between border-1 flex-wrap bg-white shadow-sm py-6">
                <div className="flex items-center flex-shrink-0 mr-6 ml-2">
                    <span className="font-bold text-3xl text-blue-900 tracking-tight">Ante Up</span>
                </div>

                {/* <div className="w-full block text-lg font-bold flex-grow lg:flex lg:items-center lg:w-auto"> */}
                <div className="w-full block text-lg font-bold flex-grow md:flex lg:flex lg:items-center lg:w-auto ml-2">
                    <div className="lg:flex-grow">
                        <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-black mr-3 pt-1">
                            Home
                        </Link>
                        {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 text-gray-500 hover:text-black">
                            Back
                        </a> */}
                    </div>
                    <div>
                        <button className="inline-block py-2 mt-4 mr-6 lg:mt-0 leading-none text-blue-700 hover:text-white border border-blue-700 
                                         hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
                                         text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Navigation;