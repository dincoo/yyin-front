const express = require('express');
const app = express()
const userRoutes = require('./user');
app.use('/vz-island/sys', userRoutes);
app.listen('3618', () => {
    console.log('Mock server is listening at http://localhost:3618');
});
app.get('/', function(req, res) {
    if (req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    } else {
        res.status(200).send('Welcome!');
    }
});