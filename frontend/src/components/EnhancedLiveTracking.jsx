import React, { useState, useEffect, useCallback } from 'react'
import { LoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

// Default to Delhi, India coordinates
const defaultCenter = {
    lat: 28.7041,
    lng: 77.1025
};

// Popular locations in Delhi for demo purposes
const demoLocations = [
    { lat: 28.7041, lng: 77.1025, name: "Connaught Place" },
    { lat: 28.6139, lng: 77.2090, name: "India Gate" },
    { lat: 28.6562, lng: 77.2410, name: "Red Fort" },
    { lat: 28.5535, lng: 77.2588, name: "Lotus Temple" },
    { lat: 28.5244, lng: 77.1855, name: "Qutub Minar" },
];

const EnhancedLiveTracking = ({ pickup, destination, showRoute = false }) => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);
    const [nearbyDrivers, setNearbyDrivers] = useState([]);
    const [directions, setDirections] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);

    // Generate random nearby drivers for demo
    const generateNearbyDrivers = useCallback((center) => {
        const drivers = [];
        for (let i = 0; i < 5; i++) {
            const latOffset = (Math.random() - 0.5) * 0.02; // ~1km radius
            const lngOffset = (Math.random() - 0.5) * 0.02;
            drivers.push({
                id: i,
                lat: center.lat + latOffset,
                lng: center.lng + lngOffset,
                name: `Driver ${i + 1}`,
                rating: (4 + Math.random()).toFixed(1),
                eta: Math.floor(Math.random() * 8) + 2 // 2-10 minutes
            });
        }
        return drivers;
    }, []);

    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const newPosition = {
                            lat: latitude,
                            lng: longitude
                        };
                        setCurrentPosition(newPosition);
                        setNearbyDrivers(generateNearbyDrivers(newPosition));
                        setIsLoading(false);
                        setLocationError(null);
                    },
                    (error) => {
                        console.log('Geolocation error:', error);
                        // Fallback to Delhi coordinates with demo data
                        setCurrentPosition(defaultCenter);
                        setNearbyDrivers(generateNearbyDrivers(defaultCenter));
                        setLocationError('Using demo location (Delhi)');
                        setIsLoading(false);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000 // 5 minutes
                    }
                );
            } else {
                setCurrentPosition(defaultCenter);
                setNearbyDrivers(generateNearbyDrivers(defaultCenter));
                setLocationError('Geolocation not supported');
                setIsLoading(false);
            }
        };

        getCurrentLocation();

        // Update location every 30 seconds
        const locationInterval = setInterval(getCurrentLocation, 30000);

        return () => clearInterval(locationInterval);
    }, [generateNearbyDrivers]);

    // Update nearby drivers every 10 seconds
    useEffect(() => {
        const driversInterval = setInterval(() => {
            setNearbyDrivers(generateNearbyDrivers(currentPosition));
        }, 10000);

        return () => clearInterval(driversInterval);
    }, [currentPosition, generateNearbyDrivers]);

    const directionsCallback = useCallback((result, status) => {
        if (status === 'OK') {
            setDirections(result);
        } else {
            console.log('Directions request failed:', status);
        }
    }, []);

    const mapOptions = {
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
    };

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

    return (
        <div className="relative h-full w-full">
            <LoadScript 
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'demo-key'}
                loadingElement={
                    <div className="flex items-center justify-center h-full bg-gray-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                }
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={14}
                    options={mapOptions}
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
                            scaledSize: window.google && window.google.maps ? new window.google.maps.Size(24, 24) : undefined,
                            anchor: window.google && window.google.maps ? new window.google.maps.Point(12, 12) : undefined
                        }}
                        title="Your Location"
                    />

                    {/* Nearby drivers */}
                    {nearbyDrivers.map((driver) => (
                        <Marker
                            key={driver.id}
                            position={{ lat: driver.lat, lng: driver.lng }}
                            icon={{
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="4" y="12" width="24" height="16" rx="4" fill="black"/>
                                        <rect x="6" y="14" width="20" height="12" rx="2" fill="white"/>
                                        <circle cx="10" cy="26" r="3" fill="black"/>
                                        <circle cx="22" cy="26" r="3" fill="black"/>
                                        <circle cx="10" cy="26" r="1.5" fill="white"/>
                                        <circle cx="22" cy="26" r="1.5" fill="white"/>
                                    </svg>
                                `),
                                scaledSize: window.google && window.google.maps ? new window.google.maps.Size(32, 32) : undefined,
                                anchor: window.google && window.google.maps ? new window.google.maps.Point(16, 16) : undefined
                            }}
                            title={`${driver.name} - ${driver.eta} min away`}
                        />
                    ))}

                    {/* Demo locations */}
                    {demoLocations.map((location, index) => (
                        <Marker
                            key={`demo-${index}`}
                            position={location}
                            icon={{
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="6" fill="#EF4444" stroke="white" stroke-width="2"/>
                                        <circle cx="10" cy="10" r="2" fill="white"/>
                                    </svg>
                                `),
                                scaledSize: window.google && window.google.maps ? new window.google.maps.Size(20, 20) : undefined,
                                anchor: window.google && window.google.maps ? new window.google.maps.Point(10, 10) : undefined
                            }}
                            title={location.name}
                        />
                    ))}

                    {/* Directions */}
                    {showRoute && pickup && destination && window.google?.maps && (
                        <DirectionsService
                            options={{
                                destination: destination,
                                origin: pickup,
                                travelMode: window.google.maps.TravelMode.DRIVING,
                            }}
                            callback={directionsCallback}
                        />
                    )}

                    {directions && (
                        <DirectionsRenderer
                            options={{
                                directions: directions,
                                suppressMarkers: true,
                                polylineOptions: {
                                    strokeColor: '#000',
                                    strokeWeight: 4,
                                    strokeOpacity: 0.8
                                }
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>

            {/* Location status indicator */}
            {locationError && (
                <div className="absolute top-4 left-4 bg-orange-100 border border-orange-300 rounded-lg p-2 shadow-lg">
                    <div className="flex items-center">
                        <i className="ri-information-line text-orange-600 mr-2"></i>
                        <span className="text-sm text-orange-800">{locationError}</span>
                    </div>
                </div>
            )}

            {/* Nearby drivers count */}
            <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center">
                    <i className="ri-car-line text-gray-600 mr-2"></i>
                    <span className="text-sm font-medium">{nearbyDrivers.length} drivers nearby</span>
                </div>
            </div>
        </div>
    );
}

export default EnhancedLiveTracking
