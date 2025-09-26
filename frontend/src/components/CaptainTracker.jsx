import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const CaptainTracker = ({ 
    pickup, 
    destination, 
    captain, 
    rideStatus = 'searching',
    onCallCaptain,
    onMessageCaptain,
    onCancelRide 
}) => {
    const [captainLocation, setCaptainLocation] = useState(captain?.location || null)
    const [directions, setDirections] = useState(null)
    const [estimatedArrival, setEstimatedArrival] = useState(null)
    const [rideProgress, setRideProgress] = useState(0)

    // Demo captain data if not provided
    const defaultCaptain = {
        id: 'CAP001',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        rating: 4.8,
        vehicleNumber: 'BR 01 AB 1234',
        vehicleModel: 'Maruti Swift Dzire',
        vehicleColor: 'White',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        location: { lat: 25.4184, lng: 86.1274 }, // Begusarai
        totalRides: 1247,
        yearsExperience: 5
    }

    const currentCaptain = captain || defaultCaptain

    // Simulate captain movement towards pickup/destination
    useEffect(() => {
        if (rideStatus === 'driver_assigned' || rideStatus === 'driver_arriving') {
            const interval = setInterval(() => {
                setCaptainLocation(prev => {
                    if (!prev || !pickup) return prev
                    
                    // Move captain towards pickup location
                    const latDiff = (pickup.lat - prev.lat) * 0.02
                    const lngDiff = (pickup.lng - prev.lng) * 0.02
                    
                    return {
                        lat: prev.lat + latDiff,
                        lng: prev.lng + lngDiff
                    }
                })
                
                // Update estimated arrival
                setEstimatedArrival(prev => Math.max(1, (prev || 8) - 0.5))
            }, 3000)

            return () => clearInterval(interval)
        } else if (rideStatus === 'ongoing') {
            const interval = setInterval(() => {
                setCaptainLocation(prev => {
                    if (!prev || !destination) return prev
                    
                    // Move captain towards destination
                    const latDiff = (destination.lat - prev.lat) * 0.01
                    const lngDiff = (destination.lng - prev.lng) * 0.01
                    
                    return {
                        lat: prev.lat + latDiff,
                        lng: prev.lng + lngDiff
                    }
                })
                
                // Update ride progress
                setRideProgress(prev => Math.min(100, prev + 2))
            }, 2000)

            return () => clearInterval(interval)
        }
    }, [rideStatus, pickup, destination])

    const directionsCallback = (result, status) => {
        if (status === 'OK') {
            setDirections(result)
        }
    }

    const getRideStatusInfo = () => {
        switch (rideStatus) {
            case 'searching':
                return {
                    title: 'Finding your captain...',
                    subtitle: 'We\'re connecting you with a nearby driver',
                    color: 'bg-blue-500',
                    icon: 'ri-search-line'
                }
            case 'driver_assigned':
                return {
                    title: 'Captain assigned!',
                    subtitle: `${currentCaptain.name} is coming to pick you up`,
                    color: 'bg-green-500',
                    icon: 'ri-user-line'
                }
            case 'driver_arriving':
                return {
                    title: 'Captain arriving',
                    subtitle: `${estimatedArrival ? Math.ceil(estimatedArrival) : 3} minutes away`,
                    color: 'bg-orange-500',
                    icon: 'ri-time-line'
                }
            case 'captain_arrived':
                return {
                    title: 'Captain has arrived!',
                    subtitle: 'Your captain is waiting for you',
                    color: 'bg-purple-500',
                    icon: 'ri-map-pin-user-line'
                }
            case 'ongoing':
                return {
                    title: 'Trip in progress',
                    subtitle: `${rideProgress}% completed`,
                    color: 'bg-indigo-500',
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
                    title: 'Tracking captain',
                    subtitle: 'Live location updates',
                    color: 'bg-gray-500',
                    icon: 'ri-map-pin-line'
                }
        }
    }

    const statusInfo = getRideStatusInfo()

    return (
        <div className="relative h-full w-full">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'demo-key'}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={captainLocation || pickup || { lat: 25.4184, lng: 86.1274 }}
                    zoom={15}
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

                    {/* Captain location marker */}
                    {captainLocation && (
                        <Marker
                            position={captainLocation}
                            icon={{
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/>
                                        <rect x="8" y="16" width="24" height="16" rx="4" fill="white"/>
                                        <rect x="10" y="18" width="20" height="12" rx="2" fill="black"/>
                                        <circle cx="14" cy="30" r="3" fill="white"/>
                                        <circle cx="26" cy="30" r="3" fill="white"/>
                                        <circle cx="14" cy="30" r="1.5" fill="black"/>
                                        <circle cx="26" cy="30" r="1.5" fill="black"/>
                                    </svg>
                                `),
                                scaledSize: window.google?.maps ? new window.google.maps.Size(40, 40) : undefined,
                                anchor: window.google?.maps ? new window.google.maps.Point(20, 20) : undefined
                            }}
                            title={`${currentCaptain.name} - Your Captain`}
                        />
                    )}

                    {/* Route directions */}
                    {captainLocation && pickup && window.google?.maps && rideStatus !== 'ongoing' && (
                        <DirectionsService
                            options={{
                                destination: pickup,
                                origin: captainLocation,
                                travelMode: window.google.maps.TravelMode.DRIVING,
                            }}
                            callback={directionsCallback}
                        />
                    )}

                    {pickup && destination && window.google?.maps && rideStatus === 'ongoing' && (
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

            {/* Captain Details Card */}
            <div className="absolute top-4 left-4 right-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex items-center space-x-4">
                        <img 
                            src={currentCaptain.photo} 
                            alt={currentCaptain.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-lg">{currentCaptain.name}</h3>
                                <div className="flex items-center">
                                    <i className="ri-star-fill text-yellow-400 text-sm"></i>
                                    <span className="text-sm font-medium ml-1">{currentCaptain.rating}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{currentCaptain.vehicleModel} • {currentCaptain.vehicleColor}</p>
                            <p className="text-sm font-medium">{currentCaptain.vehicleNumber}</p>
                        </div>
                        <div className="text-right">
                            <div className={`w-3 h-3 rounded-full ${statusInfo.color} animate-pulse`}></div>
                            <p className="text-xs text-gray-500 mt-1">{currentCaptain.totalRides} trips</p>
                        </div>
                    </div>
                    
                    {/* Status info */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-gray-900">{statusInfo.title}</h4>
                                <p className="text-sm text-gray-600">{statusInfo.subtitle}</p>
                            </div>
                            <i className={`${statusInfo.icon} text-xl text-gray-600`}></i>
                        </div>
                        
                        {rideStatus === 'ongoing' && (
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${rideProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="grid grid-cols-3 gap-3">
                        <button 
                            onClick={() => onCallCaptain?.(currentCaptain.phone)}
                            className="flex flex-col items-center justify-center p-3 bg-green-500 text-white rounded-lg"
                        >
                            <i className="ri-phone-line text-xl mb-1"></i>
                            <span className="text-xs font-medium">Call</span>
                        </button>
                        
                        <button 
                            onClick={() => onMessageCaptain?.(currentCaptain.id)}
                            className="flex flex-col items-center justify-center p-3 bg-blue-500 text-white rounded-lg"
                        >
                            <i className="ri-message-line text-xl mb-1"></i>
                            <span className="text-xs font-medium">Message</span>
                        </button>
                        
                        {(rideStatus === 'searching' || rideStatus === 'driver_assigned') && (
                            <button 
                                onClick={() => onCancelRide?.()}
                                className="flex flex-col items-center justify-center p-3 bg-red-500 text-white rounded-lg"
                            >
                                <i className="ri-close-line text-xl mb-1"></i>
                                <span className="text-xs font-medium">Cancel</span>
                            </button>
                        )}
                        
                        {rideStatus === 'captain_arrived' && (
                            <button className="flex flex-col items-center justify-center p-3 bg-purple-500 text-white rounded-lg">
                                <i className="ri-check-line text-xl mb-1"></i>
                                <span className="text-xs font-medium">I'm Here</span>
                            </button>
                        )}
                        
                        {rideStatus === 'ongoing' && (
                            <button className="flex flex-col items-center justify-center p-3 bg-orange-500 text-white rounded-lg">
                                <i className="ri-shield-line text-xl mb-1"></i>
                                <span className="text-xs font-medium">Safety</span>
                            </button>
                        )}
                    </div>
                    
                    {/* Emergency button */}
                    <button className="w-full mt-3 bg-red-600 text-white py-3 rounded-lg font-medium">
                        <i className="ri-alarm-warning-line mr-2"></i>
                        Emergency SOS
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CaptainTracker
