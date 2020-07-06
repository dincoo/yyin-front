const express = require('express');
const apiRoutes = express.Router();
let random = Math.random() * 500 + 500;
const getTags = require('./wxJsonData/getTags.json')
const getUserList = require('./wxJsonData/getUserList.json')
const getMenu = require('./wxJsonData/getMenu.json')
const getMassRecord = require('./wxJsonData/getMassRecord.json')
const getFollowReply = require('./wxJsonData/getFollowReply.json')
const getKeywordReply = require('./wxJsonData/getKeywordReply.json')
const getEventConfigList = require('./wxJsonData/getEventConfigList.json')
const getMaterialList = require('./wxJsonData/getMaterialList.json')
const getNews = require('./wxJsonData/getNews.json')
const success = {
    "data": true,
    "code": 200,
    "msg": "请求成功",
    "timestamp": 1593747385617
}
apiRoutes.get('/tagManage/getTags', function(req, res) {
    setTimeout(() => {
        res.json(getTags);
    }, random);
});
apiRoutes.post('/tagManage/deleteTags', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
});
apiRoutes.post('/tagManage/updateTag', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
});

apiRoutes.post('/userManage/getUserList', function(req, res) {
    setTimeout(() => {
        res.json(getUserList);
    }, random);
});
apiRoutes.post('/userManage/setUserRemark', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
});
apiRoutes.post('/tagManage/usersAddTags', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
});
apiRoutes.post('/tagManage/usersDeleteTags', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
});
apiRoutes.get('/menuManage/getMenu', function(req, res) {
    setTimeout(() => {
        res.json(getMenu);
    }, random);
});
apiRoutes.post('/menuManage/addMenu', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
});
apiRoutes.post('/messMessageManage/getMassRecord', function(req, res) {
    setTimeout(() => {
        res.json(getMassRecord);
    }, random);
});
apiRoutes.post('/messMessageManage/sendMessage', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/messMessageManage/deleteRecord', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/eventConfig/addFollowReply', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/eventConfig/updateFollowReply', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/eventConfig/deleteReply', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/eventConfig/getFollowReply', function(req, res) {
    setTimeout(() => {
        res.json(getFollowReply);
    }, random);
})
apiRoutes.post('/eventConfig/getKeywordReply', function(req, res) {
    setTimeout(() => {
        res.json(getKeywordReply);
    }, random);
})
apiRoutes.post('/eventConfig/addKeywordReply', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/eventConfig/updateKeywordReply', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/eventConfig/getEventConfigList', function(req, res) {
    setTimeout(() => {
        res.json(getEventConfigList);
    }, random);
})
apiRoutes.post('/eventConfig/addEventConfig', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/marterialManage/getMaterialList', function(req, res) {
    setTimeout(() => {
        res.json(getMaterialList);
    }, random);
})
apiRoutes.post('/marterialManage/deleteMarterial', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/marterialManage/createMutilNews', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/marterialManage/updateMutilNews', function(req, res) {
    setTimeout(() => {
        res.json(success);
    }, random);
})
apiRoutes.post('/marterialManage/getNews', function(req, res) {
    setTimeout(() => {
        res.json(getNews);
    }, random);
})
module.exports = apiRoutes;