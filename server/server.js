const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 
const connectDB = require('./config/db');
const animalRoutes = require('./routes/animalRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); 
const { seedAdmin } = require('./contollers/authController'); 

dotenv.config();

const app = express();    

// Middleware
app.use(express.json()); 
app.use(cors()); 
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/upload', uploadRoutes); 

// Simple Route to check if server is running
app.get('/', (req, res) => {
    res.send('Zoo Management System API is running....');
});

// Connect to Database, THEN seed the admin
connectDB().then(() => {
    seedAdmin(); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});