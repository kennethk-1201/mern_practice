const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Middleware
app.use(cors());

// JSON parser
app.use(express.json());

// Set up MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})

// Routers
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})