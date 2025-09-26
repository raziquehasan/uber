// Pricing service for calculating ride fares
export class PricingService {
    static baseFares = {
        car: 40,      // Base fare for UberGo
        moto: 25,     // Base fare for Moto
        auto: 30      // Base fare for Auto
    };

    static perKmRates = {
        car: 12,      // Per km rate for UberGo
        moto: 8,      // Per km rate for Moto
        auto: 10      // Per km rate for Auto
    };

    static perMinuteRates = {
        car: 2,       // Per minute rate for UberGo
        moto: 1.5,    // Per minute rate for Moto
        auto: 1.8     // Per minute rate for Auto
    };

    static surgePricing = {
        normal: 1.0,
        moderate: 1.3,
        high: 1.8,
        peak: 2.5
    };

    static calculateDistance(pickup, destination) {
        // Simple distance calculation (in real app, use Google Maps Distance Matrix)
        // Default to Begusarai coordinates if not provided
        const lat1 = pickup.lat || 25.4184;
        const lon1 = pickup.lng || 86.1274;
        const lat2 = destination.lat || 25.5941;
        const lon2 = destination.lng || 85.1376;

        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        return Math.max(distance, 2); // Minimum 2km for calculation
    }

    static estimateTime(distance) {
        // Estimate time based on distance (assuming average speed of 25 km/h in city)
        return Math.ceil(distance / 25 * 60); // Convert to minutes
    }

    static getSurgeMultiplier() {
        const hour = new Date().getHours();
        // Peak hours: 8-10 AM and 6-9 PM
        if ((hour >= 8 && hour <= 10) || (hour >= 18 && hour <= 21)) {
            return this.surgePricing.high;
        }
        // Moderate hours: 7-8 AM, 10-12 PM, 5-6 PM, 9-11 PM
        else if ((hour >= 7 && hour <= 12) || (hour >= 17 && hour <= 23)) {
            return this.surgePricing.moderate;
        }
        return this.surgePricing.normal;
    }

    static calculateFare(pickup, destination, vehicleType = 'car') {
        const distance = this.calculateDistance(pickup, destination);
        const estimatedTime = this.estimateTime(distance);
        const surgeMultiplier = this.getSurgeMultiplier();

        const baseFare = this.baseFares[vehicleType];
        const distanceFare = distance * this.perKmRates[vehicleType];
        const timeFare = estimatedTime * this.perMinuteRates[vehicleType];

        const subtotal = baseFare + distanceFare + timeFare;
        const surgeAmount = subtotal * (surgeMultiplier - 1);
        const total = Math.round(subtotal * surgeMultiplier);

        return {
            baseFare,
            distanceFare: Math.round(distanceFare),
            timeFare: Math.round(timeFare),
            surgeMultiplier,
            surgeAmount: Math.round(surgeAmount),
            subtotal: Math.round(subtotal),
            total,
            distance: Math.round(distance * 10) / 10, // Round to 1 decimal
            estimatedTime,
            breakdown: {
                base: `₹${baseFare}`,
                distance: `₹${Math.round(distanceFare)} (${Math.round(distance * 10) / 10} km)`,
                time: `₹${Math.round(timeFare)} (${estimatedTime} min)`,
                surge: surgeMultiplier > 1 ? `₹${Math.round(surgeAmount)} (${surgeMultiplier}x surge)` : null
            }
        };
    }

    static getAllFares(pickup, destination) {
        return {
            car: this.calculateFare(pickup, destination, 'car').total,
            moto: this.calculateFare(pickup, destination, 'moto').total,
            auto: this.calculateFare(pickup, destination, 'auto').total,
            details: {
                car: this.calculateFare(pickup, destination, 'car'),
                moto: this.calculateFare(pickup, destination, 'moto'),
                auto: this.calculateFare(pickup, destination, 'auto')
            }
        };
    }

    static getVehicleInfo() {
        return {
            car: {
                name: 'UberGo',
                capacity: 4,
                description: 'Affordable, compact rides',
                eta: '2-5 mins',
                image: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'
            },
            moto: {
                name: 'Moto',
                capacity: 1,
                description: 'Affordable motorcycle rides',
                eta: '1-3 mins',
                image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'
            },
            auto: {
                name: 'UberAuto',
                capacity: 3,
                description: 'Affordable Auto rides',
                eta: '2-4 mins',
                image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png'
            }
        };
    }
}

export default PricingService;
