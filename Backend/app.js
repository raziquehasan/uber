const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

// Temporary CORS configuration - Allow all origins for now
app.use(cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200,
    preflightContinue: false
}));

// Add explicit OPTIONS handler for all routes
app.options('*', cors());
// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World');
});

// Test CORS endpoint
app.get('/test-cors', (req, res) => {
    res.json({ 
        message: 'CORS is working!', 
        origin: req.headers.origin,
        timestamp: new Date().toISOString()
    });
});

// Test users route
app.get('/users/test', (req, res) => {
    res.json({ 
        message: 'Users route is working!',
        timestamp: new Date().toISOString()
    });
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);



module.exports = app;