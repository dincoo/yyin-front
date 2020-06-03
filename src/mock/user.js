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
apiRoutes.post('/login', function(req, res) {
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
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.post('/menu/save', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.delete('/menu/delete', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.get('/menu/listMenu', function(req, res) {
    setTimeout(() => {
        res.json({
            httpCode: 200,
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
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.post('/user/save', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1590378579738
        });
    }, random);
});
apiRoutes.delete('/user/delete', function(req, res) {
    setTimeout(() => {
        res.json({
            data: 1,
            httpCode: 200,
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
module.exports = apiRoutes;