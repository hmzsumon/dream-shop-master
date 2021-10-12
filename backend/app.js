const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error');

app.use(express.json());

// Route Import
const product = require('./routes/productRoute');

app.use('/api/v1/', product);

// Middleware for Error
app.use(errorMiddleware);

// // Initial route
// app.get('/', (req, res) => {
// 	res.status(200).json({ message: 'Welcome My Dream Shop' });
// });

module.exports = app;
