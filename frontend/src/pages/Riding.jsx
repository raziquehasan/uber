import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import CaptainTracker from '../components/CaptainTracker'

const Riding = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const [rideStatus, setRideStatus] = useState('ongoing')

    useEffect(() => {
        socket.on("ride-ended", () => {
            setRideStatus('completed')
            setTimeout(() => {
                navigate('/home')
            }, 3000)
        })

        return () => {
            socket.off("ride-ended")
        }
    }, [socket, navigate])

    // Convert ride data to captain format
    const captain = ride?.captain ? {
        id: ride.captain._id,
        name: `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname}`,
        phone: ride.captain.phone || '+91 98765 43210',
        rating: ride.captain.rating || 4.8,
        vehicleNumber: ride.captain.vehicle.plate,
        vehicleModel: ride.captain.vehicle.vehicleType || 'Car',
        vehicleColor: ride.captain.vehicle.color || 'White',
        photo: ride.captain.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        location: { lat: 25.4184, lng: 86.1274 }, // Default to Begusarai
        totalRides: 1247,
        yearsExperience: 5
    } : null

    const pickup = ride?.pickup ? 
        { lat: 25.4184, lng: 86.1274 } : // Default pickup location
        { lat: 25.4184, lng: 86.1274 }

    const destination = ride?.destination ? 
        { lat: 25.5941, lng: 85.1376 } : // Default destination (Patna)
        { lat: 25.5941, lng: 85.1376 }

    const handleCallCaptain = (phone) => {
        window.open(`tel:${phone}`, '_self')
    }

    const handleMessageCaptain = (captainId) => {
        // Implement messaging functionality
        alert(`Opening chat with captain ${captainId}`)
    }

    const handleCancelRide = () => {
        if (confirm('Are you sure you want to cancel this ride?')) {
            navigate('/home')
        }
    }

    return (
        <div className='h-screen relative'>
            {/* Home button */}
            <Link 
                to='/home' 
                className='fixed right-4 top-4 h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-lg z-50 hover:bg-gray-50 transition-colors'
            >
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>

            {/* Captain Tracker - Full Screen */}
            <CaptainTracker
                pickup={pickup}
                destination={destination}
                captain={captain}
                rideStatus={rideStatus}
                onCallCaptain={handleCallCaptain}
                onMessageCaptain={handleMessageCaptain}
                onCancelRide={handleCancelRide}
            />
        </div>
    )
}

export default Riding