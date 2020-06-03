const express = require('express');
const apiRoutes = express.Router();
const deptList = require('./jsonData/deptList.json')
const deptDetail = require('./jsonData/deptDetail.json')
let random = Math.random() * 500 + 500;
apiRoutes.get('/list', function(req, res) {
    setTimeout(() => {
        res.json(deptList);
    }, random);
});
apiRoutes.post('/update', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.post('/save', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.delete('/delete', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.get('/info/:roleId', function(req, res) {
    setTimeout(() => {
        res.json(deptDetail);
    }, random);
});
module.exports = apiRoutes;