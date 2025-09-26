import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div className="max-h-[75vh] sm:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Modern drag handle */}
            <div className='flex justify-center py-2'>
                <div className='w-12 h-1 bg-gray-300 rounded-full cursor-pointer' onClick={() => {
                    props.setVehicleFound(false)
                }}></div>
            </div>
            
            <div className="px-1 sm:px-2">
                <h3 className='text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-5 text-center'>Looking for a Driver</h3>

                <div className='flex flex-col items-center space-y-4 sm:space-y-5'>
                    {/* Loading animation and vehicle image */}
                    <div className="relative flex flex-col items-center">
                        <div className="relative">
                            <img 
                                className='h-16 sm:h-20 w-auto object-contain' 
                                src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
                                alt="Vehicle" 
                            />
                            {/* Loading spinner overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black opacity-60"></div>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <div className="flex items-center justify-center space-x-1">
                                <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Connecting you with nearby drivers...</p>
                        </div>
                    </div>

                    {/* Trip details */}
                    <div className='w-full bg-white rounded-lg border border-gray-200'>
                        {/* Pickup location */}
                        <div className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b border-gray-200'>
                            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <h3 className='text-sm sm:text-base font-medium text-gray-900'>Pickup Location</h3>
                                <p className='text-xs sm:text-sm text-gray-600 truncate mt-0.5'>{props.pickup || 'Current Location'}</p>
                            </div>
                        </div>
                        
                        {/* destination */}
                        <div className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b border-gray-200'>
                            <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <h3 className='text-sm sm:text-base font-medium text-gray-900'>Drop Location</h3>
                                <p className='text-xs sm:text-sm text-gray-600 truncate mt-0.5'>{props.destination || 'Destination'}</p>
                            </div>
                        </div>
                        
                        {/* Fare */}
                        <div className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4'>
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="ri-currency-line text-green-600 text-sm"></i>
                            </div>
                            <div className="flex-1">
                                <h3 className='text-sm sm:text-base font-semibold text-gray-900'>₹{props.fare?.[props.vehicleType] || '0'}</h3>
                                <p className='text-xs sm:text-sm text-gray-600 mt-0.5'>Cash Payment</p>
                            </div>
                        </div>
                    </div>

                    {/* Status and estimated time */}
                    <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-sm sm:text-base font-medium text-blue-900">Finding your ride</span>
                            </div>
                            <span className="text-xs sm:text-sm text-blue-600 font-medium">~2-5 min</span>
                        </div>
                        <p className="text-xs sm:text-sm text-blue-700 mt-2">We're matching you with the nearest available driver</p>
                    </div>

                    {/* Cancel button */}
                    <button 
                        onClick={() => props.setVehicleFound(false)}
                        className='w-full mt-3 sm:mt-4 bg-gray-100 text-gray-700 font-semibold p-3 sm:p-4 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300'
                    >
                        Cancel Ride
                    </button>

                    {/* Help text */}
                    <p className="text-xs text-gray-500 text-center mt-2 px-4">
                        Having trouble? Contact support for assistance.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver