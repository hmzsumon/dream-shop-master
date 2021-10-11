const express = require('express');

const app = express();

app.use(express.json());

// Route Import
const product = require('./routes/productRoute');

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome My Dream Shop' });
});

app.use('/api/v1/', product);

module.exports = app;
