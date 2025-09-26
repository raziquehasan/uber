# 🚗 Uber Clone - Full Stack Ride Sharing Application

A modern, responsive Uber clone built with React.js, Node.js, and real-time features. This application provides a complete ride-sharing experience with user authentication, live tracking, and payment integration.

![Uber Clone](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-black)

## ✨ Features

### 🎯 Core Features
- **Dual User System** - Separate interfaces for riders and drivers (captains)
- **User Authentication** - Secure login/signup with JWT tokens
- **Google OAuth Integration** - Quick login with Google accounts
- **Real-time Location Tracking** - Live driver and user location updates
- **Interactive Maps** - Google Maps integration with custom markers
- **Vehicle Selection** - Multiple vehicle types (Car, Moto, Auto)
- **Fare Calculation** - Dynamic pricing with surge pricing support
- **Ride Booking** - Complete ride booking flow from request to completion
- **Driver Matching** - Intelligent driver-rider matching system
- **Live Ride Tracking** - Real-time ride progress monitoring

### 📱 Responsive Design
- **Mobile-First Approach** - Optimized for all screen sizes (320px+)
- **Touch-Friendly UI** - Large touch targets and smooth interactions
- **Progressive Web App Ready** - Works offline and installable
- **Cross-Platform** - Works on iOS, Android, and Desktop
- **Responsive Components** - All UI elements adapt to screen size
- **Modern Animations** - Smooth transitions and loading states

### 🔧 Technical Features
- **Real-time Communication** - Socket.io for live updates
- **State Management** - React Context API
- **Modern UI Components** - Custom responsive components
- **RESTful API** - Well-documented API endpoints
- **Security** - JWT authentication and protected routes
- **Error Handling** - Comprehensive error management
- **Data Validation** - Input validation on both client and server

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Socket.io Client** - Real-time communication
- **Google Maps API** - Interactive maps and geocoding
- **GSAP** - Smooth animations and transitions
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing and security
- **Google Maps API** - Geocoding and distance calculations

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Google Maps API key
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raziquehasan/uber.git
   cd uber
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in Backend directory:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/uber-clone
   JWT_SECRET=your-secret-key
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```
   
   Create `.env` file in frontend directory:
   ```env
   VITE_BASE_URL=http://localhost:4000
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

5. **Start the Application**
   
   Backend (Terminal 1):
   ```bash
   cd Backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📱 Screenshots

### Mobile View
- Responsive header with Uber logo
- Interactive map with live tracking
- Touch-friendly vehicle selection
- Mobile-optimized panels and forms

### Desktop View
- Full-screen map experience
- Sidebar panels for better UX
- Enhanced typography and spacing
- Professional business interface

## 🎨 UI/UX Features

### Responsive Design Highlights
- **Header**: Fixed positioning with gradient background
- **Maps**: Full-screen responsive with proper touch controls
- **Panels**: Sliding panels with drag handles
- **Forms**: Touch-friendly inputs with proper validation
- **Buttons**: Large touch targets with hover effects
- **Typography**: Scalable text across all devices

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- High contrast colors
- Screen reader compatible
- Touch-friendly interface

# 📚 API Documentation

## User Endpoints

### `POST /users/register`

**Description:** Registers a new user by creating a user account with the provided information.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "jwt_token_here"
}
```

### `POST /users/login`

**Description:** Authenticates a user using their email and password, returning a JWT token upon successful login.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "jwt_token_here"
}
```

### `GET /users/profile`

**Description:** Retrieves the profile information of the currently authenticated user.

**Authentication:** Required - Bearer token in Authorization header

**Response:**
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### `GET /users/logout`

**Description:** Logout the current user and blacklist the token provided in cookie or headers.

**Authentication:** Required - Bearer token in Authorization header or cookie

**Response:**
```json
{
  "message": "Logout successfully"
}
```

## Captain (Driver) Endpoints

### `POST /captains/register`

**Description:** Registers a new captain by creating a captain account with the provided information.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Response:**
```json
{
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "jwt_token_here"
}
```

### `POST /captains/login`

**Description:** Authenticates a captain using their email and password, returning a JWT token upon successful login.

**Request Body:**
```json
{
  "email": "jane.smith@example.com",
  "password": "securePassword123"
}
```

### `GET /captains/profile`

**Description:** Retrieves the profile information of the currently authenticated captain.

**Authentication:** Required - Bearer token in Authorization header

### `GET /captains/logout`

**Description:** Logout the current captain and blacklist the token provided in cookie or headers.

**Authentication:** Required - Bearer token in Authorization header or cookie

## Maps Endpoints

### `GET /maps/get-coordinates`

**Description:** Retrieves the coordinates (latitude and longitude) for a given address.

**Query Parameters:**
- `address` (string, required): The address for which to retrieve coordinates

**Example Request:**
```
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
```

**Response:**
```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

**Error Response:**
```json
{
  "message": "Coordinates not found"
}
```

### `GET /maps/get-distance-time`

**Description:** Retrieves the distance and estimated travel time between two locations.

**Query Parameters:**
- `origin` (string, required): The starting address or location
- `destination` (string, required): The destination address or location

**Example Request:**
```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

**Response:**
```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
```

### `GET /maps/get-suggestions`

**Description:** Retrieves autocomplete suggestions for a given input string.

**Query Parameters:**
- `input` (string, required): The input string for which to retrieve suggestions

**Example Request:**
```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

**Response:**
```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

## Ride Endpoints

### `POST /rides/create`

**Description:** Creates a new ride with the provided information.

**Authentication:** Required - Bearer token in Authorization header

**Request Body:**
```json
{
  "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
  "destination": "1 Infinite Loop, Cupertino, CA",
  "vehicleType": "car"
}
```

**Response:**
```json
{
  "ride": {
    "user": "user_id",
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "fare": 25.50,
    "status": "pending",
    "duration": 1800,
    "distance": 15000,
    "otp": "1234"
  }
}
```

### `GET /rides/get-fare`

**Description:** Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

**Authentication:** Required - Bearer token in Authorization header

**Query Parameters:**
- `pickup` (string, required): The pickup address (minimum 3 characters)
- `destination` (string, required): The destination address (minimum 3 characters)

**Example Request:**
```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

**Response:**
```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment settings

### Backend (Heroku/Railway)
1. Create Procfile: `web: node server.js`
2. Set environment variables
3. Deploy with Git integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Razique Hasan**
- GitHub: [@raziquehasan](https://github.com/raziquehasan)
- LinkedIn: [Connect with me](https://linkedin.com/in/raziquehasan)

## 🙏 Acknowledgments

- Uber for design inspiration
- Google Maps for location services
- React community for amazing tools
- Open source contributors

## 📞 Support

If you have any questions or need help, please open an issue or contact me directly.

---

⭐ **Star this repository if you found it helpful!**
