import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import PricingService from '../services/pricingService';

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {


        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
    })


    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])


    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])


    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        try {
            // Try to get fare from backend first
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setFare(response.data)
        } catch (error) {
            // Fallback to client-side pricing calculation
            console.log('Using client-side pricing calculation')
            const pickupCoords = { lat: 28.7041, lng: 77.1025 } // Default Delhi coordinates
            const destinationCoords = { lat: 28.5355, lng: 77.3910 } // Default Gurgaon coordinates
            
            const enhancedFare = PricingService.getAllFares(pickupCoords, destinationCoords)
            setFare(enhancedFare)
        }
    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType,
            fare: fare[vehicleType]
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


    }

    return (
        <div className='h-screen relative overflow-hidden'>
            {/* Header with Uber logo - Fixed positioning and responsive */}
            <div className='absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/30 to-transparent p-2 sm:p-3 md:p-4'>
                <div className='flex items-center justify-between min-h-[40px] sm:min-h-[48px]'>
                    <div className='flex items-center flex-shrink-0'>
                        <img 
                            className='h-6 w-auto sm:h-8 md:h-10 object-contain' 
                            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
                            alt="Uber" 
                        />
                    </div>
                    <div className='flex items-center space-x-1 sm:space-x-2 text-white text-xs sm:text-sm flex-shrink-0 ml-2'>
                        <i className="ri-map-pin-line flex-shrink-0"></i>
                        <span className='hidden xs:inline whitespace-nowrap'>12 cities available</span>
                        <span className='xs:hidden'>12</span>
                    </div>
                </div>
            </div>
            
            {/* Map container with proper sizing */}
            <div className='h-screen w-full relative'>
                <LiveTracking />
            </div>
            {/* Bottom panel container - Improved responsiveness */}
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none'>
                <div className='h-[30%] sm:h-[35%] md:h-[30%] p-4 sm:p-6 bg-white relative rounded-t-2xl shadow-lg pointer-events-auto'>
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-4 sm:right-6 top-4 sm:top-6 text-xl sm:text-2xl cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-colors'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2'>Find a trip</h4>
                    <form className='relative py-2 sm:py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-14 sm:h-16 w-1 top-[50%] -translate-y-1/2 left-4 sm:left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition-all'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg rounded-lg w-full mt-2 sm:mt-3 focus:outline-none focus:ring-2 focus:ring-black transition-all'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                    <button
                        onClick={findTrip}
                        disabled={!pickup || !destination}
                        className='bg-black text-white px-4 py-2.5 sm:py-3 rounded-lg mt-3 sm:mt-4 w-full font-semibold text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-all transform active:scale-95'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pointer-events-auto'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 sm:px-4 py-4 sm:py-6 md:py-8 pt-6 sm:pt-8 md:pt-10 rounded-t-2xl shadow-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-thin'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 sm:px-4 py-4 sm:py-6 pt-6 sm:pt-8 md:pt-10 rounded-t-2xl shadow-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-thin'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 sm:px-4 py-4 sm:py-6 pt-6 sm:pt-8 md:pt-10 rounded-t-2xl shadow-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 sm:px-4 py-4 sm:py-6 pt-6 sm:pt-8 md:pt-10 rounded-t-2xl shadow-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
        </div>
    )
}

export default Home