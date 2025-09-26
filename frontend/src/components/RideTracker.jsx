import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const RideTracker = ({ pickup, destination, driverLocation, rideStatus = 'searching' }) => {
    const [directions, setDirections] = useState(null)
    const [currentDriverLocation, setCurrentDriverLocation] = useState(driverLocation)
    const [estimatedTime, setEstimatedTime] = useState(null)
    const [distance, setDistance] = useState(null)

    // Simulate driver movement for demo
    useEffect(() => {
        if (rideStatus === 'ongoing' && pickup && destination) {
            const interval = setInterval(() => {
                setCurrentDriverLocation(prev => {
                    if (!prev) return null
                    
                    // Simulate movement towards destination
                    const latDiff = (destination.lat - prev.lat) * 0.01
                    const lngDiff = (destination.lng - prev.lng) * 0.01
                    
                    return {
                        lat: prev.lat + latDiff,
                        lng: prev.lng + lngDiff
                    }
                })
            }, 5000) // Update every 5 seconds

            return () => clearInterval(interval)
        }
    }, [rideStatus, pickup, destination])

    const directionsCallback = (result, status) => {
        if (status === 'OK') {
            setDirections(result)
            const route = result.routes[0]
            if (route) {
                setDistance(route.legs[0].distance.text)
                setEstimatedTime(route.legs[0].duration.text)
            }
        }
    }

    const getRideStatusInfo = () => {
        switch (rideStatus) {
            case 'searching':
                return {
                    title: 'Finding your ride...',
                    subtitle: 'We\'re connecting you with a nearby driver',
                    color: 'bg-blue-500',
                    icon: 'ri-search-line'
                }
            case 'driver_assigned':
                return {
                    title: 'Driver assigned!',
                    subtitle: 'Your driver is on the way to pick you up',
                    color: 'bg-green-500',
                    icon: 'ri-car-line'
                }
            case 'driver_arriving':
                return {
                    title: 'Driver arriving',
                    subtitle: 'Your driver will arrive in 2-3 minutes',
                    color: 'bg-orange-500',
                    icon: 'ri-time-line'
                }
            case 'ongoing':
                return {
                    title: 'Trip in progress',
                    subtitle: 'Enjoy your ride!',
                    color: 'bg-purple-500',
                    icon: 'ri-navigation-line'
                }
            case 'completed':
                return {
                    title: 'Trip completed',
                    subtitle: 'Thank you for riding with us!',
                    color: 'bg-green-600',
                    icon: 'ri-check-line'
                }
            default:
                return {
                    title: 'Ride status',
                    subtitle: 'Tracking your ride',
                    color: 'bg-gray-500',
                    icon: 'ri-information-line'
                }
        }
    }

    const statusInfo = getRideStatusInfo()

    return (
        <div className="relative h-full w-full">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'demo-key'}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentDriverLocation || pickup || { lat: 28.7041, lng: 77.1025 }}
                    zoom={14}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                        styles: [
                            {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [{ visibility: "off" }]
                            }
                        ]
                    }}
                >
                    {/* Pickup location marker */}
                    {pickup && (
                        <Marker
                            position={pickup}
                            icon={{
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="8" fill="#10B981" stroke="white" stroke-width="3"/>
                                        <circle cx="12" cy="12" r="3" fill="white"/>
                                    </svg>
                                `),
                                scaledSize: window.google?.maps ? new window.google.maps.Size(24, 24) : undefined,
                                anchor: window.google?.maps ? new window.google.maps.Point(12, 12) : undefined
                            }}
                            title="Pickup Location"
                        />
                    )}

                    {/* Destination marker */}
                    {destination && (
                        <Marker
                            position={destination}
                            icon={{
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="8" fill="#EF4444" stroke="white" stroke-width="3"/>
                                        <circle cx="12" cy="12" r="3" fill="white"/>
                                    </svg>
                                `),
                                scaledSize: window.google?.maps ? new window.google.maps.Size(24, 24) : undefined,
                                anchor: window.google?.maps ? new window.google.maps.Point(12, 12) : undefined
                            }}
                            title="Destination"
                        />
                    )}

                    {/* Driver location marker */}
                    {currentDriverLocation && (
                        <Marker
                            position={currentDriverLocation}
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
                                scaledSize: window.google?.maps ? new window.google.maps.Size(32, 32) : undefined,
                                anchor: window.google?.maps ? new window.google.maps.Point(16, 16) : undefined
                            }}
                            title="Your Driver"
                        />
                    )}

                    {/* Route directions */}
                    {pickup && destination && window.google?.maps && (
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

            {/* Ride status overlay */}
            <div className="absolute top-4 left-4 right-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${statusInfo.color} mr-3 animate-pulse`}></div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{statusInfo.title}</h3>
                            <p className="text-sm text-gray-600">{statusInfo.subtitle}</p>
                        </div>
                        <i className={`${statusInfo.icon} text-xl text-gray-600`}></i>
                    </div>
                    
                    {(distance || estimatedTime) && (
                        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-sm">
                            {distance && (
                                <div>
                                    <span className="text-gray-500">Distance: </span>
                                    <span className="font-medium">{distance}</span>
                                </div>
                            )}
                            {estimatedTime && (
                                <div>
                                    <span className="text-gray-500">ETA: </span>
                                    <span className="font-medium">{estimatedTime}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Emergency and support buttons */}
            <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-3">
                    <button className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg font-medium">
                        <i className="ri-phone-line mr-2"></i>
                        Emergency
                    </button>
                    <button className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg font-medium">
                        <i className="ri-customer-service-line mr-2"></i>
                        Support
                    </button>
                    <button className="bg-white border border-gray-300 p-3 rounded-lg">
                        <i className="ri-share-line text-gray-600"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RideTracker
