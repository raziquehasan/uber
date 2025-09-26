import React, { useState } from 'react'
import PricingService from '../services/pricingService'

const ConfirmRide = (props) => {
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [showFareBreakdown, setShowFareBreakdown] = useState(false)
    
    const vehicleInfo = PricingService.getVehicleInfo()
    const currentVehicle = vehicleInfo[props.vehicleType]
    const fareDetails = props.fare.details?.[props.vehicleType]

    const paymentMethods = [
        { id: 'cash', name: 'Cash', icon: 'ri-money-rupee-circle-line' },
        { id: 'upi', name: 'UPI', icon: 'ri-smartphone-line' },
        { id: 'card', name: 'Card', icon: 'ri-bank-card-line' },
        { id: 'wallet', name: 'Wallet', icon: 'ri-wallet-line' }
    ]

    return (
        <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <h5 className='p-1 text-center w-[93%] absolute top-0 z-10' onClick={() => {
                props.setConfirmRidePanel(false)
            }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            
            <div className="pt-8">
                <h3 className='text-xl sm:text-2xl font-semibold mb-5'>Confirm your Ride</h3>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    {/* Vehicle Info */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 w-full">
                        <img className='h-16 w-24 object-contain' src={currentVehicle?.image} alt={currentVehicle?.name} />
                        <div className="ml-4">
                            <h4 className="font-semibold text-lg">{currentVehicle?.name}</h4>
                            <p className="text-sm text-gray-600">{currentVehicle?.eta} • {currentVehicle?.capacity} seats</p>
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-4 p-4 border-b border-gray-200'>
                            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <h3 className='text-base font-medium'>Pickup Location</h3>
                                <p className='text-sm text-gray-600 truncate'>{props.pickup}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-center gap-4 p-4 border-b border-gray-200'>
                            <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                                <h3 className='text-base font-medium'>Drop Location</h3>
                                <p className='text-sm text-gray-600 truncate'>{props.destination}</p>
                            </div>
                        </div>

                        {/* Fare Section */}
                        <div className='p-4 border-b border-gray-200'>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <i className="ri-currency-line text-lg"></i>
                                    <div>
                                        <h3 className='text-lg font-semibold'>₹{props.fare[props.vehicleType]}</h3>
                                        <p className='text-sm text-gray-600'>Total Fare</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowFareBreakdown(!showFareBreakdown)}
                                    className="text-blue-600 text-sm font-medium"
                                >
                                    {showFareBreakdown ? 'Hide' : 'View'} Details
                                </button>
                            </div>

                            {/* Fare Breakdown */}
                            {showFareBreakdown && fareDetails && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-sm mb-2">Fare Breakdown</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Base Fare</span>
                                            <span>₹{fareDetails.baseFare}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Distance ({fareDetails.distance} km)</span>
                                            <span>₹{fareDetails.distanceFare}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Time ({fareDetails.estimatedTime} min)</span>
                                            <span>₹{fareDetails.timeFare}</span>
                                        </div>
                                        {fareDetails.surgeMultiplier > 1 && (
                                            <div className="flex justify-between text-orange-600">
                                                <span>Surge ({fareDetails.surgeMultiplier}x)</span>
                                                <span>₹{fareDetails.surgeAmount}</span>
                                            </div>
                                        )}
                                        <div className="border-t pt-2 flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>₹{fareDetails.total}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className='p-4'>
                            <h4 className="font-medium mb-3">Payment Method</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                                            paymentMethod === method.id 
                                                ? 'border-black bg-gray-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <i className={`${method.icon} text-lg`}></i>
                                        <span className="text-sm font-medium">{method.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <button 
                        onClick={() => {
                            props.setVehicleFound(true)
                            props.setConfirmRidePanel(false)
                            props.createRide()
                        }} 
                        className='w-full mt-5 bg-black text-white font-semibold p-4 rounded-lg hover:bg-gray-800 transition-colors'
                    >
                        Confirm Ride • ₹{props.fare[props.vehicleType]}
                    </button>

                    {/* Terms */}
                    <p className="text-xs text-gray-500 text-center mt-3 px-4">
                        By confirming, you agree to our terms and conditions. 
                        Cancellation charges may apply.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRide