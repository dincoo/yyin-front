const express = require('express');
const Mock = require('mockjs');
const apiRoutes = express.Router();

let random = Math.random() * 500 + 500;
// 访问 /user/ 时
apiRoutes.post('/login', function(req, res) {
    setTimeout(() => {
        res.json({
            httpCode: 200,
            msg: "请求成功",
            timestamp: 1589532854259,
            data: {
                accessToken: '1235656'
            }
        });
    }, random);
});
// 访问 /user/1111 时
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
                        { id: "department", indexNum: "5", name: "部门管理", parentPath: "", path: "/sysManage/department" },
                        { id: "log", indexNum: "6", name: "日志管理", parentPath: "", path: "/sysManage/log" }
                    ],
                    iconClass: "fa fa-cog",
                    id: "1",
                    indexNum: "9",
                    name: "系统管理",
                    parentId: "120",
                    url: "#",
                }, {
                    "name": "工具",
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
                            "name": "日志",
                            "path": "/util/logs"
                        },
                        {
                            "name": "表格权限控制",
                            "path": "/util/permission"
                        },
                        {
                            "name": "存储",
                            "path": "/util/store"
                        },
                        {
                            "name": "表格",
                            "path": "/util/table"
                        },
                        {
                            "name": "标签",
                            "path": "/util/tags"
                        }, {
                            "name": "测试",
                            "path": "/util/test"
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

module.exports = apiRoutes;