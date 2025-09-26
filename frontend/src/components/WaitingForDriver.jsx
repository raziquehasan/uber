import React, { useState } from 'react'

const WaitingForDriver = (props) => {
  const [showTrackingDetails, setShowTrackingDetails] = useState(false)

  const handleCallCaptain = () => {
    const phone = props.ride?.captain?.phone || '+91 98765 43210'
    window.open(`tel:${phone}`, '_self')
  }

  const handleTrackCaptain = () => {
    setShowTrackingDetails(!showTrackingDetails)
  }

  return (
    <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <h5 className='p-1 text-center w-[93%] absolute top-0 z-10' onClick={() => {
        props.setWaitingForDriver(false)
      }}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="pt-8">
        {/* Captain Info Card */}
        <div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4'>
          <div className='flex items-center justify-between'>
            <div className="flex items-center space-x-3">
              <img 
                className='h-16 w-16 rounded-full object-cover border-2 border-green-500' 
                src={props.ride?.captain?.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"} 
                alt="Captain" 
              />
              <div>
                <h2 className='text-lg font-semibold capitalize text-gray-900'>
                  {props.ride?.captain?.fullname?.firstname || 'Rajesh'} {props.ride?.captain?.fullname?.lastname || 'Kumar'}
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-400 text-sm"></i>
                    <span className="text-sm font-medium ml-1">4.8</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">1,247 trips</span>
                </div>
                <p className='text-sm text-gray-600'>
                  {props.ride?.captain?.vehicle?.vehicleType || 'Maruti Suzuki Alto'} • 
                  {props.ride?.captain?.vehicle?.color || 'White'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <h4 className='text-xl font-bold text-gray-900'>{props.ride?.captain?.vehicle?.plate || 'BR 01 AB 1234'}</h4>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                OTP: {props.ride?.otp || '1234'}
              </div>
            </div>
          </div>

          {/* Captain Status */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm font-medium text-gray-900">Captain is on the way</span>
              </div>
              <span className="text-sm text-green-600 font-medium">2-3 mins away</span>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className='w-full space-y-3'>
          <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h3 className='text-base font-medium text-gray-900'>Pickup Location</h3>
              <p className='text-sm text-gray-600 truncate'>{props.ride?.pickup || 'Begusarai Railway Station'}</p>
            </div>
          </div>
          
          <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
            <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h3 className='text-base font-medium text-gray-900'>Drop Location</h3>
              <p className='text-sm text-gray-600 truncate'>{props.ride?.destination || 'Patna Junction'}</p>
            </div>
          </div>
          
          <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
            <i className="ri-currency-line text-lg text-gray-600"></i>
            <div className="flex-1">
              <h3 className='text-base font-medium text-gray-900'>₹{props.ride?.fare || '150'}</h3>
              <p className='text-sm text-gray-600'>Cash Payment</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleCallCaptain}
              className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              <i className="ri-phone-line mr-2"></i>
              Call Captain
            </button>
            
            <button 
              onClick={handleTrackCaptain}
              className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              <i className="ri-map-pin-line mr-2"></i>
              Track Live
            </button>
          </div>

          <button className="w-full p-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors">
            <i className="ri-message-line mr-2"></i>
            Message Captain
          </button>

          <button className="w-full p-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
            <i className="ri-alarm-warning-line mr-2"></i>
            Emergency SOS
          </button>
        </div>

        {/* Tracking Details */}
        {showTrackingDetails && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Live Tracking Active</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Current Location:</span>
                <span>Begusarai Main road</span>
              </div>
              <div className="flex justify-between">
                <span>Distance to you:</span>
                <span>1.2 km</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated arrival:</span>
                <span>2-3 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Last updated:</span>
                <span>Just now</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-blue-600 mt-1">Captain is 75% of the way to you</p>
            </div>
          </div>
        )}

        {/* safety Info */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Safety First</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• Verify OTP before starting your trip</p>
            <p>• Check vehicle number matches your booking</p>
            <p>• Share trip details with family/friends</p>
            <p>• Use emergency SOS if needed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver