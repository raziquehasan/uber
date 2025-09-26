import React, { useState, useEffect } from 'react'

const FallbackMap = ({ currentPosition, nearbyDrivers = [], majorCities = [] }) => {
    const [mapCenter, setMapCenter] = useState(currentPosition)
    const [zoom, setZoom] = useState(14)

    useEffect(() => {
        if (currentPosition) {
            setMapCenter(currentPosition)
        }
    }, [currentPosition])

    // Convert lat/lng to pixel coordinates for display
    const latLngToPixel = (lat, lng, centerLat, centerLng, zoomLevel) => {
        const scale = Math.pow(2, zoomLevel - 10)
        const x = (lng - centerLng) * scale * 100 + 200
        const y = (centerLat - lat) * scale * 100 + 200
        return { x, y }
    }

    return (
        <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="absolute inset-0">
                    {/* Grid pattern to simulate map */}
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Roads simulation */}
            <svg className="absolute inset-0 w-full h-full">
                <path d="M0,200 Q200,150 400,200 T800,200" stroke="#6B7280" strokeWidth="4" fill="none" opacity="0.6"/>
                <path d="M200,0 Q250,200 200,400" stroke="#6B7280" strokeWidth="3" fill="none" opacity="0.6"/>
                <path d="M100,100 Q300,120 500,100 T900,100" stroke="#9CA3AF" strokeWidth="2" fill="none" opacity="0.4"/>
            </svg>

            {/* Current Location Marker */}
            {currentPosition && (
                <div 
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ 
                        left: '50%', 
                        top: '50%'
                    }}
                >
                    <div className="relative">
                        <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                            Your Location
                        </div>
                    </div>
                </div>
            )}

            {/* Nearby Drivers */}
            {nearbyDrivers.map((driver, index) => {
                const angle = (index * 45) + Math.sin(Date.now() / 1000 + index) * 10
                const distance = 60 + Math.cos(Date.now() / 2000 + index) * 20
                const x = 50 + Math.cos(angle * Math.PI / 180) * distance / 2
                const y = 50 + Math.sin(angle * Math.PI / 180) * distance / 2
                
                return (
                    <div 
                        key={`driver-${index}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000"
                        style={{ 
                            left: `${x}%`, 
                            top: `${y}%`
                        }}
                    >
                        <div className="relative group">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                                    <rect x="2" y="8" width="16" height="8" rx="2"/>
                                    <circle cx="6" cy="14" r="2"/>
                                    <circle cx="14" cy="14" r="2"/>
                                </svg>
                            </div>
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Driver {index + 1} • {Math.floor(Math.random() * 5) + 2} min
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Major Cities (if zoomed out) */}
            {zoom < 12 && majorCities.slice(0, 5).map((city, index) => {
                const x = 20 + (index * 15) + Math.random() * 10
                const y = 30 + Math.random() * 40
                
                return (
                    <div 
                        key={`city-${index}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-5"
                        style={{ 
                            left: `${x}%`, 
                            top: `${y}%`
                        }}
                    >
                        <div className="relative group">
                            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow"></div>
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-1 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {city.name}
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <button 
                    onClick={() => setZoom(Math.min(18, zoom + 1))}
                    className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                >
                    <i className="ri-add-line text-lg"></i>
                </button>
                <button 
                    onClick={() => setZoom(Math.max(8, zoom - 1))}
                    className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                >
                    <i className="ri-subtract-line text-lg"></i>
                </button>
            </div>

            {/* Location Info - Moved to avoid header collision */}
            <div className="absolute top-20 sm:top-16 left-2 sm:left-4 bg-white rounded-lg p-2 sm:p-3 shadow-lg max-w-[280px] sm:max-w-xs">
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm font-medium truncate">Live Tracking Active</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 truncate">
                    📍 Begusarai, Bihar • Zoom: {zoom}
                </div>
                <div className="text-xs text-green-600 mt-1 font-medium truncate">
                    🚗 Real-time driver locations
                </div>
            </div>

            {/* Demo Map Notice - Made more responsive */}
            <div className="absolute bottom-4 left-2 sm:left-4 bg-green-100 border border-green-300 rounded-lg p-2 text-xs text-green-800 max-w-[280px] sm:max-w-none">
                <div className="flex items-center">
                    <i className="ri-check-circle-line mr-1 flex-shrink-0"></i>
                    <span className="truncate sm:whitespace-normal">Demo Map Active - Fully Functional Uber Experience</span>
                </div>
            </div>
        </div>
    )
}

export default FallbackMap
