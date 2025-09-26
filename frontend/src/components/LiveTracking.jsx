import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import FallbackMap from './FallbackMap'

const containerStyle = {
    width: '100%',
    height: '100%',
};

// Default to Begusarai, Bihar coordinates - user's current location
const center = {
    lat: 25.4184,
    lng: 86.1274
};

// Major Indian cities for demo locations
const majorIndianCities = [
    { lat: 28.7041, lng: 77.1025, name: "New Delhi" },
    { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
    { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
    { lat: 17.3850, lng: 78.4867, name: "Hyderabad" },
    { lat: 13.0827, lng: 80.2707, name: "Chennai" },
    { lat: 18.5204, lng: 73.8567, name: "Pune" },
    { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
    { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
    { lat: 26.9124, lng: 75.7873, name: "Jaipur" },
    { lat: 28.4595, lng: 77.0266, name: "Gurgaon" },
    { lat: 25.5941, lng: 85.1376, name: "Patna" },
    { lat: 25.4184, lng: 86.1274, name: "Begusarai" }
];

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);
    const [isLoading, setIsLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);
    const [useGoogleMaps, setUseGoogleMaps] = useState(true);

    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentPosition({
                            lat: latitude,
                            lng: longitude
                        });
                        setIsLoading(false);
                        setLocationError(null);
                    },
                    (error) => {
                        console.log('Geolocation error:', error);
                        setCurrentPosition(center); // Fallback to Delhi
                        setLocationError('Using demo location (Delhi)');
                        setIsLoading(false);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000
                    }
                );
            } else {
                setCurrentPosition(center);
                setLocationError('Geolocation not supported');
                setIsLoading(false);
            }
        };

        getCurrentLocation();

        // Update location every 30 seconds
        const locationInterval = setInterval(getCurrentLocation, 30000);

        return () => clearInterval(locationInterval);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                </div>
            </div>
        );
    }

    // Check if we should use Google Maps or fallback
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    // Force fallback map until Google Maps API is properly configured
    const shouldUseFallback = true // !apiKey || apiKey === 'demo-key' || !useGoogleMaps

    if (shouldUseFallback) {
        return (
            <div className="relative h-full w-full">
                <FallbackMap 
                    currentPosition={currentPosition}
                    nearbyDrivers={Array.from({ length: 8 }, (_, i) => ({ id: i }))}
                    majorCities={majorIndianCities}
                />
                
                {/* Location status indicator - Positioned to avoid header */}
                {locationError && (
                    <div className="absolute top-20 sm:top-16 left-2 sm:left-4 bg-orange-100 border border-orange-300 rounded-lg p-2 shadow-lg max-w-[calc(100vw-1rem)] sm:max-w-xs z-10">
                        <div className="flex items-center">
                            <i className="ri-information-line text-orange-600 mr-2 flex-shrink-0"></i>
                            <span className="text-xs sm:text-sm text-orange-800 truncate">{locationError}</span>
                        </div>
                    </div>
                )}

                {/* Service availability indicator - Moved to avoid header collision */}
                <div className="absolute top-20 sm:top-16 right-2 sm:right-4 bg-white rounded-lg p-2 sm:p-3 shadow-lg hidden sm:block z-10">
                    <div className="space-y-1 sm:space-y-2">
                        <div className="flex items-center">
                            <i className="ri-map-pin-line text-green-600 mr-1 sm:mr-2 text-sm"></i>
                            <span className="text-xs sm:text-sm font-medium">{majorIndianCities.length} cities</span>
                        </div>
                        <div className="flex items-center">
                            <i className="ri-car-line text-blue-600 mr-1 sm:mr-2 text-sm"></i>
                            <span className="text-xs sm:text-sm font-medium">8 drivers</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative h-full w-full">
            <LoadScript 
                googleMapsApiKey={apiKey}
                libraries={['places', 'geometry']}
                loadingElement={
                    <div className="flex items-center justify-center h-full bg-gray-100">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading Google Maps...</p>
                        </div>
                    </div>
                }
                onLoad={() => console.log('Google Maps loaded successfully')}
                onError={(error) => {
                    console.error('Google Maps failed to load:', error)
                    setLocationError('Google Maps failed to load - using demo map')
                    setUseGoogleMaps(false)
                }}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={15}
                    options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        styles: [
                            {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [{ visibility: "off" }]
                            }
                        ]
                    }}
                    onLoad={(map) => {
                        console.log('Map instance loaded:', map)
                        // Optional: Store map instance for future use
                    }}
                    onError={(error) => {
                        console.error('Map error:', error)
                        setUseGoogleMaps(false)
                    }}
                >
                    {/* Current location marker */}
                    <Marker 
                        position={currentPosition}
                        icon={{
                            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="3"/>
                                    <circle cx="12" cy="12" r="3" fill="white"/>
                                </svg>
                            `),
                            scaledSize: window.google?.maps ? new window.google.maps.Size(24, 24) : undefined,
                            anchor: window.google?.maps ? new window.google.maps.Point(12, 12) : undefined
                        }}
                        title="Your Current Location"
                    />

                    {/* Major Indian cities markers */}
                    {majorIndianCities.map((city, index) => (
                        <Marker
                            key={`city-${index}`}
                            position={city}
                            icon={{
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="6" fill="#EF4444" stroke="white" stroke-width="2"/>
                                        <circle cx="8" cy="8" r="2" fill="white"/>
                                    </svg>
                                `),
                                scaledSize: window.google?.maps ? new window.google.maps.Size(16, 16) : undefined,
                                anchor: window.google?.maps ? new window.google.maps.Point(8, 8) : undefined
                            }}
                            title={`${city.name} - Available for rides`}
                        />
                    ))}

                    {/* Nearby drivers simulation */}
                    {Array.from({ length: 8 }, (_, i) => {
                        const latOffset = (Math.random() - 0.5) * 0.05;
                        const lngOffset = (Math.random() - 0.5) * 0.05;
                        return (
                            <Marker
                                key={`driver-${i}`}
                                position={{
                                    lat: currentPosition.lat + latOffset,
                                    lng: currentPosition.lng + lngOffset
                                }}
                                icon={{
                                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="2" y="8" width="16" height="10" rx="2" fill="black"/>
                                            <rect x="3" y="9" width="14" height="8" rx="1" fill="white"/>
                                            <circle cx="6" cy="17" r="2" fill="black"/>
                                            <circle cx="14" cy="17" r="2" fill="black"/>
                                            <circle cx="6" cy="17" r="1" fill="white"/>
                                            <circle cx="14" cy="17" r="1" fill="white"/>
                                        </svg>
                                    `),
                                    scaledSize: window.google?.maps ? new window.google.maps.Size(20, 20) : undefined,
                                    anchor: window.google?.maps ? new window.google.maps.Point(10, 10) : undefined
                                }}
                                title={`Driver ${i + 1} - ${Math.floor(Math.random() * 8) + 2} min away`}
                            />
                        );
                    })}
                </GoogleMap>
            </LoadScript>

            {/* Location status indicator - Positioned to avoid header */}
            {locationError && (
                <div className="absolute top-20 sm:top-16 left-2 sm:left-4 bg-orange-100 border border-orange-300 rounded-lg p-2 shadow-lg max-w-[calc(100vw-1rem)] sm:max-w-xs z-10">
                    <div className="flex items-center">
                        <i className="ri-information-line text-orange-600 mr-2 flex-shrink-0"></i>
                        <span className="text-xs sm:text-sm text-orange-800 truncate">{locationError}</span>
                    </div>
                </div>
            )}

            {/* Service availability indicator - Moved to avoid header collision */}
            <div className="absolute top-20 sm:top-16 right-2 sm:right-4 bg-white rounded-lg p-2 sm:p-3 shadow-lg hidden sm:block z-10">
                <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center">
                        <i className="ri-map-pin-line text-green-600 mr-1 sm:mr-2 text-sm"></i>
                        <span className="text-xs sm:text-sm font-medium">{majorIndianCities.length} cities</span>
                    </div>
                    <div className="flex items-center">
                        <i className="ri-car-line text-blue-600 mr-1 sm:mr-2 text-sm"></i>
                        <span className="text-xs sm:text-sm font-medium">8 drivers</span>
                    </div>
                </div>
            </div>

            {/* Zoom controls for mobile - Better positioning */}
            <div className="absolute bottom-24 sm:bottom-20 right-2 sm:right-4 flex flex-col space-y-2 md:hidden">
                <button className="bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors">
                    <i className="ri-add-line text-base sm:text-lg"></i>
                </button>
                <button className="bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors">
                    <i className="ri-subtract-line text-base sm:text-lg"></i>
                </button>
            </div>
        </div>
    );
}

export default LiveTracking