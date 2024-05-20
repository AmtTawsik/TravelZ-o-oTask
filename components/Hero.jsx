import React from 'react'

function Hero() {
    return (
        <div className='bg-[#3C6382] py-10'>
            <div className="flex w-11/12 mx-auto mb-0.5">
                <div className="flex">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <div>
                            <input type="radio" id="profile" name="tab" value="profile" className="hidden peer" />
                            <label
                                htmlFor="profile"
                                className="px-4 bg-white border border-gray-200 rounded-l-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 focus:z-10 focus:ring-2 peer-checked:bg-[#EA8135] peer-checked:text-white py-5 peer-checked:border-b-4 peer-checked:border-[#0A3D62]"
                            >
                                Round Trip
                            </label>
                        </div>

                        <div>
                            <input type="radio" id="settings" name="tab" value="settings" className="hidden peer" defaultChecked />
                            <label
                                htmlFor="settings"
                                className="px-4 bg-white border-t border-b border-gray-200 cursor-pointer hover:text-gray-600 hover:bg-gray-100 focus:z-10 focus:ring-2 peer-checked:bg-[#EA8135] peer-checked:text-white py-5 peer-checked:border-b-4 peer-checked:border-[#0A3D62]"
                            >
                                One Way
                            </label>
                        </div>

                        <div>
                            <input type="radio" id="messages" name="tab" value="messages" className="hidden peer" />
                            <label
                                htmlFor="messages"
                                className="px-4 bg-white border border-gray-200 rounded-r-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 focus:z-10 focus:ring-2 peer-checked:bg-[#EA8135] peer-checked:text-white py-5 peer-checked:border-b-4 peer-checked:border-[#0A3D62]"
                            >
                                Multi City
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center w-11/12 mx-auto mt-5">
                <div className="bg-white w-full md:w-fit shadow-md rounded p-4 md:flex items-center md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <span role="img" aria-label="plane" className="text-xl">✈️</span>
                        <div>
                            <div className="text-gray-500 text-sm">Flying from</div>
                            <input
                                className="border-none focus:outline-none focus:ring-0"
                                type="text" placeholder='City or Airport'
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span role="img" aria-label="plane" className="text-xl">✈️</span>
                        <div>
                            <div className="text-gray-500 text-sm">Flying to</div>
                            <input
                                className="border-none focus:outline-none focus:ring-0"
                                type="text" placeholder='City or Airport'
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="text-xl text-gray-600">&#128197;</div>
                        <div>
                            <div className="text-gray-500 text-sm">Departing</div>
                            <input
                                className="border-none focus:outline-none focus:ring-0"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="text-xl text-gray-600">&#128100;</div>
                        <div>
                            <div className="text-gray-500 text-sm">Travelers</div>
                            <input
                                className="border-none focus:outline-none focus:ring-0"
                                type="text" placeholder='1 Adult Economy'
                            />
                        </div>
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        Modify Search
                    </button>
                </div>
            </div>
            <div className='bg-[#0A3D62] flex justify-center py-1 my-5'>
                <div className='text-white text-sm'>
                    <p>20 May, 2024</p>
                    <div className='flex justify-center items-center text-sm'>
                        <p>DAC</p>
                        <img className='w-[20px] mx-1' src="/aro-icon.png" alt="" />
                        <p>DXB</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero