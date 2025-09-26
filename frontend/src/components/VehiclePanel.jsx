
import React, { useState } from 'react'
import PricingService from '../services/pricingService'

const VehiclePanel = (props) => {
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const vehicleInfo = PricingService.getVehicleInfo()
    
    const handleVehicleSelect = (vehicleType) => {
        setSelectedVehicle(vehicleType)
        props.setConfirmRidePanel(true)
        props.selectVehicle(vehicleType)
    }

    const getSurgeInfo = () => {
        const surgeMultiplier = PricingService.getSurgeMultiplier()
        if (surgeMultiplier > 1) {
            return (
                <div className="bg-orange-100 border border-orange-300 rounded-lg p-2 mb-3">
                    <div className="flex items-center">
                        <i className="ri-fire-line text-orange-600 mr-2"></i>
                        <span className="text-sm font-medium text-orange-800">
                            {surgeMultiplier}x surge pricing in effect
                        </span>
                    </div>
                </div>
            )
        }
        return null
    }

    return (
        <div className="max-h-[75vh] sm:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className='flex justify-center py-2'>
                <div className='w-12 h-1 bg-gray-300 rounded-full cursor-pointer' onClick={() => {
                    props.setVehiclePanel(false)
                }}></div>
            </div>
            
            <div className="px-1 sm:px-2">
                <h3 className='text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-center'>Choose a Vehicle</h3>
                
                {getSurgeInfo()}
                
                <div className="space-y-2 sm:space-y-3">
                    {/* UberGo */}
                    <div 
                        onClick={() => handleVehicleSelect('car')} 
                        className={`flex border-2 transition-all duration-200 hover:border-gray-400 active:border-black rounded-lg sm:rounded-xl w-full p-2.5 sm:p-3 items-center justify-between cursor-pointer ${
                            selectedVehicle === 'car' ? 'border-black bg-gray-50' : 'border-gray-200'
                        }`}
                    >
                        <div className="flex items-center flex-1 min-w-0">
                            <img className='h-8 sm:h-10 w-12 sm:w-16 object-contain flex-shrink-0' src={vehicleInfo.car.image} alt="UberGo" />
                            <div className='ml-2 sm:ml-3 flex-1 min-w-0'>
                                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                    <h4 className='font-medium text-sm sm:text-base truncate'>{vehicleInfo.car.name}</h4>
                                    <span className="flex items-center text-gray-600 flex-shrink-0">
                                        <i className="ri-user-3-fill text-xs sm:text-sm"></i>
                                        <span className="text-xs sm:text-sm ml-1">{vehicleInfo.car.capacity}</span>
                                    </span>
                                </div>
                                <h5 className='font-medium text-xs sm:text-sm text-green-600'>{vehicleInfo.car.eta}</h5>
                                <p className='font-normal text-xs text-gray-600 truncate hidden sm:block'>{vehicleInfo.car.description}</p>
                            </div>
                        </div>
                        <div className="text-right ml-2 sm:ml-3 flex-shrink-0">
                            <h2 className='text-base sm:text-lg font-semibold'>₹{props.fare.car}</h2>
                            {props.fare.details?.car?.surgeMultiplier > 1 && (
                                <p className="text-xs text-orange-600">+surge</p>
                            )}
                        </div>
                    </div>

                    {/* Moto */}
                    <div 
                        onClick={() => handleVehicleSelect('moto')} 
                        className={`flex border-2 transition-all duration-200 hover:border-gray-400 active:border-black rounded-lg sm:rounded-xl w-full p-2.5 sm:p-3 items-center justify-between cursor-pointer ${
                            selectedVehicle === 'moto' ? 'border-black bg-gray-50' : 'border-gray-200'
                        }`}
                    >
                        <div className="flex items-center flex-1 min-w-0">
                            <img className='h-8 sm:h-10 w-12 sm:w-16 object-contain flex-shrink-0' src={vehicleInfo.moto.image} alt="Moto" />
                            <div className='ml-2 sm:ml-3 flex-1 min-w-0'>
                                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                    <h4 className='font-medium text-sm sm:text-base truncate'>{vehicleInfo.moto.name}</h4>
                                    <span className="flex items-center text-gray-600 flex-shrink-0">
                                        <i className="ri-user-3-fill text-xs sm:text-sm"></i>
                                        <span className="text-xs sm:text-sm ml-1">{vehicleInfo.moto.capacity}</span>
                                    </span>
                                </div>
                                <h5 className='font-medium text-xs sm:text-sm text-green-600'>{vehicleInfo.moto.eta}</h5>
                                <p className='font-normal text-xs text-gray-600 truncate hidden sm:block'>{vehicleInfo.moto.description}</p>
                            </div>
                        </div>
                        <div className="text-right ml-2 sm:ml-3 flex-shrink-0">
                            <h2 className='text-base sm:text-lg font-semibold'>₹{props.fare.moto}</h2>
                            {props.fare.details?.moto?.surgeMultiplier > 1 && (
                                <p className="text-xs text-orange-600">+surge</p>
                            )}
                        </div>
                    </div>

                    {/* Auto */}
                    <div 
                        onClick={() => handleVehicleSelect('auto')} 
                        className={`flex border-2 transition-all duration-200 hover:border-gray-400 active:border-black rounded-lg sm:rounded-xl w-full p-2.5 sm:p-3 items-center justify-between cursor-pointer ${
                            selectedVehicle === 'auto' ? 'border-black bg-gray-50' : 'border-gray-200'
                        }`}
                    >
                        <div className="flex items-center flex-1 min-w-0">
                            <img className='h-8 sm:h-10 w-12 sm:w-16 object-contain flex-shrink-0' src={vehicleInfo.auto.image} alt="Auto" />
                            <div className='ml-2 sm:ml-3 flex-1 min-w-0'>
                                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                    <h4 className='font-medium text-sm sm:text-base truncate'>{vehicleInfo.auto.name}</h4>
                                    <span className="flex items-center text-gray-600 flex-shrink-0">
                                        <i className="ri-user-3-fill text-xs sm:text-sm"></i>
                                        <span className="text-xs sm:text-sm ml-1">{vehicleInfo.auto.capacity}</span>
                                    </span>
                                </div>
                                <h5 className='font-medium text-xs sm:text-sm text-green-600'>{vehicleInfo.auto.eta}</h5>
                                <p className='font-normal text-xs text-gray-600 truncate hidden sm:block'>{vehicleInfo.auto.description}</p>
                            </div>
                        </div>
                        <div className="text-right ml-2 sm:ml-3 flex-shrink-0">
                            <h2 className='text-base sm:text-lg font-semibold'>₹{props.fare.auto}</h2>
                            {props.fare.details?.auto?.surgeMultiplier > 1 && (
                                <p className="text-xs text-orange-600">+surge</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pricing Info */}
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-xs sm:text-sm mb-2">Fare Details</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                        <p>• Base fare + Distance + Time</p>
                        <p>• Prices may vary based on demand</p>
                        <p className="hidden sm:block">• Toll charges (if any) will be added</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel
