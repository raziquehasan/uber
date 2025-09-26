// Utility functions for Google Maps
export const validateApiKey = async (apiKey) => {
    if (!apiKey || apiKey === 'demo-key') {
        return { valid: false, error: 'No API key provided' }
    }

    try {
        // Simple test to check if API key works
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=Delhi&key=${apiKey}`
        )
        const data = await response.json()
        
        if (data.status === 'OK') {
            return { valid: true, error: null }
        } else if (data.status === 'REQUEST_DENIED') {
            return { valid: false, error: 'API key invalid or restricted' }
        } else {
            return { valid: false, error: `API Error: ${data.status}` }
        }
    } catch (error) {
        return { valid: false, error: `Network error: ${error.message}` }
    }
}

export const getLocationName = async (lat, lng, apiKey) => {
    if (!apiKey || apiKey === 'demo-key') {
        return 'Begusarai, Bihar' // Default location
    }

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        )
        const data = await response.json()
        
        if (data.status === 'OK' && data.results.length > 0) {
            return data.results[0].formatted_address
        }
        return 'Unknown Location'
    } catch (error) {
        console.error('Geocoding error:', error)
        return 'Location unavailable'
    }
}
