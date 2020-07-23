const express = require('express');
const Mock = require('mockjs');
const apiRoutes = express.Router();
const menuAll = require('./jsonData/menuAll.json');
const menuSelect = require('./jsonData/menuSelect.json');
const menuDetail = require('./jsonData/menuDetail.json');
const userList = require('./jsonData/userList.json')
const userDetail = require('./jsonData/userDetail.json')
    // console.log(menuAll)
let random = Math.random() * 500 + 500;
// 访问 /user/ 时

apiRoutes.get('/menu/list', function(req, res) {
    setTimeout(() => {
        res.json(menuAll);
    }, random);
});
apiRoutes.get('/menu/select', function(req, res) {
    setTimeout(() => {
        res.json(menuSelect);
    }, random);
});
apiRoutes.get('/menu/info/:menuId', function(req, res) {
    setTimeout(() => {
        res.json(menuDetail);
    }, random);
});
apiRoutes.put('/menu/update', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.post('/menu/save', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.delete('/menu/delete', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.get('/menu/listMenu', function(req, res) {
    setTimeout(() => {
        res.json({
            code: 200,
            msg: "请求成功",
            timestamp: 1589532854259,
            data: {
                asider: [{
                    children: [
                        { id: "user", indexNum: "1", name: "管理员管理", parentPath: "", path: "/sysManage/user" },
                        { id: "menu", indexNum: "3", name: "菜单管理", parentPath: "", path: "/sysManage/menu" },
                        { id: "role", indexNum: "2", name: "角色管理", parentPath: "", path: "/sysManage/role" },
                        { id: "department", indexNum: "5", name: "部门管理", parentPath: "", path: "/sysManage/department" }
                    ],
                    iconClass: "fa fa-cog",
                    id: "1",
                    indexNum: "9",
                    name: "系统管理",
                    parentId: "120",
                    url: "#",
                }, {
                    id: "3",
                    parentId: "122",
                    url: "#",
                    name: "微信后台管理",
                    indexNum: "3",
                    iconClass: "fa fa-cog",
                    children: [{
                        name: "用户管理",
                        path: "/wxManage/wx-user-manage",
                        id: "wx-user-manage",
                        indexNum: "3-1"
                    }, {
                        name: "群发记录",
                        path: "/wxManage/wx-mass-message",
                        id: "wx-mass-message",
                        indexNum: "3-2"
                    }, {
                        name: "菜单设置",
                        path: "/wxManage/wx-menu-manage",
                        id: "wx-menu-manage",
                        indexNum: "3-3"
                    }]
                }, {
                    id: "4",
                    parentId: "122",
                    url: "#",
                    name: "素材管理",
                    indexNum: "4",
                    iconClass: "fa fa-cog",
                    children: [{
                        "name": "图片管理",
                        "path": "/wxManage/wx-material-picture-manage",
                        "id": "wx-material-picture-manage",
                        "indexNum": "4-1"
                    }, {
                        "name": "语音管理",
                        "path": "/wxManage/wx-material-voice-manage",
                        "id": "wx-material-voice-manage",
                        "indexNum": "4-2"
                    }, {
                        "name": "视频管理",
                        "path": "/wxManage/wx-material-video-manage",
                        "id": "wx-material-video-manage",
                        "indexNum": "4-3"
                    }, {
                        "name": "图文管理",
                        "path": "/wxManage/wx-material-news-manage",
                        "id": "wx-material-news-manage",
                        "indexNum": "4-4"
                    }]
                }, {
                    id: "5",
                    parentId: "122",
                    url: "#",
                    name: "消息回复",
                    indexNum: "5",
                    iconClass: "fa fa-cog",
                    children: [{
                        "name": "关注时回复",
                        "path": "/wxManage/wx-attention-reply",
                        "id": "wx-attention-reply",
                        "indexNum": "5-1"
                    }, {
                        "name": "关键词回复",
                        "path": "/wxManage/wx-key-reply",
                        "id": "wx-key-reply",
                        "indexNum": "5-2"
                    }, {
                        "name": "其他回复",
                        "path": "/wxManage/wx-other-reply",
                        "id": "wx-other-reply",
                        "indexNum": "5-3"
                    }]
                }, {
                    children: [{
                        name: '采集查询',
                        id: '6-1',
                        indexNum: "6-1",
                        path: "/collection/collection-list"
                    }, {
                        name: '字段集',
                        id: '6-2',
                        indexNum: "6-2",
                        path: "/collection/field-manage"
                    }],
                    iconClass: "fa fa-cog",
                    id: "6",
                    indexNum: "6",
                    name: "采集",
                    parentId: "120",
                    url: "#"
                }, {
                    "name": "示例",
                    "url": "#",
                    iconClass: "iconfont iconicon_savememo",
                    id: "2",
                    parentId: "121",
                    indexNum: "10",
                    "children": [{
                            "name": "数据展示",
                            "path": "/util/data"
                        },
                        {
                            "name": "表单",
                            "path": "/util/form"
                        },
                        {
                            "name": "表格权限控制",
                            "path": "/util/permission"
                        },
                        {
                            "name": "表格",
                            "path": "/util/table"
                        }
                    ]
                }],
                module: [{
                    children: [],
                    iconClass: "fa fa-sketch",
                    id: "120",
                    indexNum: "0",
                    name: "管理中心",
                    parentId: "",
                    url: "/indexPage/manageCenter"
                }, {
                    children: [],
                    iconClass: "fas fa-tablet-alt",
                    id: "121",
                    indexNum: "1",
                    name: "应用中心",
                    parentId: "",
                    url: "/indexPage/applyCenter"
                }, {
                    children: [],
                    iconClass: "fas fa-tablet-alt",
                    id: "122",
                    indexNum: "2",
                    name: "微信应用",
                    parentId: "",
                    url: ""
                }]
            }
        });
    }, random);
});
apiRoutes.post('/user/list', function(req, res) {
    setTimeout(() => {
        res.json(userList);
    }, random);
})
apiRoutes.put('/user/update', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.post('/user/save', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.delete('/user/delete', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.get('/user/info/:userId', function(req, res) {
    setTimeout(() => {
        res.json(userDetail);
    }, random);
});
apiRoutes.get('/logout', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            code: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
module.exports = apiRoutes;