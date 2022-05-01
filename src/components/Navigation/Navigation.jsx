import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Navigation(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div className="flex items-center justify-between border-1 flex-wrap bg-white p-6 shadow-sm">
                <div className="flex items-center flex-shrink-0 pl-6 mr-6">
                    <span className="font-bold text-3xl text-blue-900 tracking-tight">Ante Up</span>
                </div>

                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-lg font-bold lg:flex-grow">
                        <Link to="/home" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 text-gray-500 hover:text-black mr-3">
                            Home
                        </Link>
                        {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 text-gray-500 hover:text-black">
                            Back
                        </a> */}
                    </div>
                    <div>
                        <button className="inline-block text-lg font-bold pr-6 py-2 leading-none text-gray-500 hover:text-black mt-4 lg:mt-0"
                            onClick={() => dispatch({ type: 'LOGOUT' })}>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Navigation;