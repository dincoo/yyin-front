import Layout from '@/page/index/'
export default [{
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
        path: 'index',
        name: '首页',
        meta: {
            i18n: 'dashboard'
        },
        component: () =>
            import ( /* webpackChunkName: "views" */ '@/views/wel')
    }]
}, {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    children: [{
        path: 'index',
        name: '测试页',
        meta: {
            i18n: 'test',
            isAuth: false
        },
        component: () =>
            import ( /* webpackChunkName: "views" */ '@/views/util/test')
    }],
    meta: {
        isAuth: false
    }
}, {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{
        path: 'index',
        name: '个人信息',
        meta: {
            i18n: 'info'
        },
        component: () =>
            import ( /* webpackChunkName: "views" */ '@/views/user/info')
    }]
}, {
    path: '/collection/collection-detail',
    name: 'CollectionDetail',
    component: () =>
        import ('@/page/index/'),
    redirect: '/collection/collection-detail/index',
    children: [{
        path: 'index',
        name: '采集详情',
        meta: {
            isAuth: true
        },
        component: () =>
            import ( /* webpackChunkName: "views" */ '@/views/collection/collection-detail')
    }]
}]