import { React } from 'react';

function Navigation(props) {


    return (
        <div>
            <nav class="flex items-center justify-between border-2 border-black-900 flex-wrap bg-white p-6 shadow-md">
                <div class="flex items-center flex-shrink-0 text-black-900 mr-6">
                    <span class="font-semibold text-3xl tracking-tight">Ante Up</span>
                </div>

                <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-md font-bold lg:flex-grow">
                        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 text-gray-500 hover:text-black mr-3">
                            Home
                        </a>
                        <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 px-4 py-2 text-gray-500 hover:text-black">
                            Back
                        </a>
                    </div>
                    <div>
                        <a href="#" class="inline-block text-md font-bold px-4 py-2 leading-none text-gray-500 hover:text-black mt-4 lg:mt-0">Log Out</a>
                    </div>
                </div>
            </nav>
        </div>
    )

}


export default Navigation;