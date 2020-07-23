const express = require('express');
const apiRoutes = express.Router();
const roleList = require('./jsonData/roleList.json')
const roleDetail = require('./jsonData/roleDetail.json')
const roleSelect = require('./jsonData/roleSelect.json')
let random = Math.random() * 500 + 500;
apiRoutes.post('/list', function(req, res) {
    setTimeout(() => {
        res.json(roleList);
    }, random);
});
apiRoutes.put('/update', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.post('/save', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.delete('/delete', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.post('/select', function(req, res) {
    setTimeout(() => {
        res.json(roleSelect);
    }, random);
});
apiRoutes.get('/info/:roleId', function(req, res) {
    setTimeout(() => {
        res.json(roleDetail);
    }, random);
});
module.exports = apiRoutes;