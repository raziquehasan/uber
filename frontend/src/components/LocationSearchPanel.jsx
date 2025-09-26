
import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        setPanelOpen(false)
    }

    const popularLocations = [
        // Delhi NCR
        "Connaught Place, New Delhi",
        "India Gate, New Delhi", 
        "Red Fort, New Delhi",
        "Lotus Temple, New Delhi",
        "Gurgaon Cyber City, Haryana",
        "Noida Sector 18, Uttar Pradesh",
        
        // Mumbai
        "Gateway of India, Mumbai",
        "Bandra-Kurla Complex, Mumbai",
        "Andheri East, Mumbai",
        "Powai, Mumbai",
        
        // Bangalore
        "MG Road, Bangalore",
        "Electronic City, Bangalore",
        "Whitefield, Bangalore",
        "Koramangala, Bangalore",
        
        // Hyderabad
        "HITEC City, Hyderabad",
        "Banjara Hills, Hyderabad",
        "Jubilee Hills, Hyderabad",
        
        // Chennai
        "T. Nagar, Chennai",
        "Anna Nagar, Chennai",
        "OMR, Chennai",
        
        // Pune
        "Koregaon Park, Pune",
        "Hinjewadi, Pune",
        "Viman Nagar, Pune",
        
        // Kolkata
        "Park Street, Kolkata",
        "Salt Lake, Kolkata",
        "New Town, Kolkata",
        
        // Bihar
        "Patna Junction, Patna",
        "Gandhi Maidan, Patna",
        "Boring Road, Patna",
        "Begusarai Railway Station, Begusarai",
        "Begusarai Bus Stand, Begusarai",
        "Begusarai College, Begusarai"
    ]

    return (
        <div className="max-h-[55vh] sm:max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-3 sm:p-4">
            {/* Current search suggestions */}
            {suggestions && suggestions.length > 0 && (
                <div className="mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3 uppercase tracking-wide">
                        {activeField === 'pickup' ? 'Pickup Locations' : 'Destinations'}
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                        {suggestions.map((elem, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => handleSuggestionClick(elem)} 
                                className='flex gap-2 sm:gap-3 border border-gray-200 hover:border-gray-400 p-2.5 sm:p-3 rounded-lg sm:rounded-xl items-center cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100'
                            >
                                <div className='bg-gray-100 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full flex-shrink-0'>
                                    <i className="ri-map-pin-fill text-gray-600 text-sm sm:text-base"></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className='font-medium text-sm sm:text-base text-gray-900 truncate'>{elem}</h4>
                                    <p className="text-xs sm:text-sm text-gray-500">Suggested location</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Popular locations when no suggestions */}
            {(!suggestions || suggestions.length === 0) && (
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3 uppercase tracking-wide">Popular Locations in India</h3>
                    <div className="space-y-1.5 sm:space-y-2 max-h-48 sm:max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {popularLocations.map((location, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => handleSuggestionClick(location)} 
                                className='flex gap-2 sm:gap-3 border border-gray-200 hover:border-gray-400 p-2.5 sm:p-3 rounded-lg sm:rounded-xl items-center cursor-pointer transition-all duration-200 hover:bg-gray-50 active:bg-gray-100'
                            >
                                <div className='bg-gray-100 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full flex-shrink-0'>
                                    <i className="ri-time-line text-gray-600 text-sm sm:text-base"></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className='font-medium text-sm sm:text-base text-gray-900 truncate'>{location}</h4>
                                    <p className="text-xs sm:text-sm text-gray-500">Popular destination</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick actions */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3 uppercase tracking-wide">Quick Actions</h3>
                <div className="space-y-1.5 sm:space-y-2">
                    <div 
                        onClick={() => {
                            if (activeField === 'pickup') {
                                setPickup("Current Location")
                            }
                            setPanelOpen(false)
                        }}
                        className='flex gap-2 sm:gap-3 border border-blue-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl items-center cursor-pointer transition-all duration-200 active:bg-blue-200'
                    >
                        <div className='bg-blue-100 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full flex-shrink-0'>
                            <i className="ri-navigation-fill text-blue-600 text-sm sm:text-base"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className='font-medium text-sm sm:text-base text-blue-900'>Use Current Location</h4>
                            <p className="text-xs sm:text-sm text-blue-600">Auto-detect your location</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationSearchPanel
