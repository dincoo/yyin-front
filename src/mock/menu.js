import Mock from 'mockjs'

const top = [{
        label: "首页",
        path: "/wel",
        icon: 'el-icon-menu',
        meta: {
            i18n: 'dashboard',
        },
        parentId: 0
    },
    {
        label: "bladex官网",
        icon: 'el-icon-document',
        meta: {
            i18n: 'website',
        },
        path: "https://bladex.vip/#/",
        parentId: 1
    },
    {
        label: "avuex官网",
        icon: 'el-icon-document',
        meta: {
            i18n: 'avuexwebsite',
        },
        path: "/test/index",
        parentId: 2
    },
    {
        label: "测试",
        icon: 'el-icon-document',
        path: "/test/index",
        meta: {
            i18n: 'test',
        },
        parentId: 3
    }
]
export default ({ mock }) => {
    // console.log(mock)
    if (!mock) return;
    Mock.mock('/user/getTopMenu', 'get', () => {
        return {
            data: top
        }
    });
    Mock.mock('/blade-system/menu/routes', 'get', () => {
        return {
            data: [{
                    "name": "工具",
                    "path": "/util",
                    "source": "iconfont iconicon_savememo",
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
                }
                // , {
                //     alias: "menu",
                //     name: "工作台",
                //     path: "/desk",
                //     children: [{
                //         path: "/desk/notice",
                //         name: "通知公告"
                //     }]
                // }, {
                //     name: "系统管理",
                //     path: "/system",
                //     alias: "menu",
                //     source: "iconfont iconicon_setting",
                //     children: [{
                //         name: "用户管理",
                //         path: "/system/user"
                //     }, {
                //         name: "机构管理",
                //         path: "/system/dept"
                //     }, {
                //         name: "岗位管理",
                //         path: "/system/post"
                //     }, {
                //         name: "系统字典",
                //         path: "/system/dict"
                //     }, {
                //         name: "菜单管理",
                //         path: "/system/menu"
                //     }, {
                //         name: "参数管理",
                //         path: "/system/param"
                //     }, {
                //         name: "租户管理",
                //         path: "/system/tenant"
                //     }, {
                //         name: "应用管理",
                //         path: "/system/client"
                //     }]
                // }
            ]
        }
    });
    Mock.mock('/blade-system/menu/buttons', 'get', () => {
        return {
            data: []
        }
    });
}