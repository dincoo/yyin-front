const express = require('express');
const app = express()
const userRoutes = require('./user');
const roleRoutes = require('./role');
const deptRoutes = require('./dept');
let random = Math.random() * 500 + 500;
app.use('/api/sys/dept', deptRoutes);
app.use('/api/sys/role', roleRoutes);
app.use('/api/sys', userRoutes);
app.listen('3618', () => {
    console.log('Mock server is listening at http://localhost:3618');
});
app.post('/api/login', function(req, res) {
    setTimeout(() => {
        res.json({
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1589532854259,
            data: {
                accessToken: '1235656',
                id: '12345'
            }
        });
    }, random);
});
app.get('/', function(req, res) {
    if (req.protocol === 'https') {
        res.status(200).send('Welcome to Safety Land!');
    } else {
        res.status(200).send('Welcome!');
    }
});