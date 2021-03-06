/**
 * 全局配置文件
 */
export default {
    title: "微众信科",
    indexTitle: '微众信科',
    clientId: 'saber', // 客户端id
    clientSecret: 'saber_secret', // 客户端密钥
    tenantMode: false, // 是否开启租户模式
    captchaMode: true, // 是否开启验证码模式(用户名密码登录，显示图形验证码)
    logo: "S",
    key: 'saber', //配置主键,目前用于存储
    lockPage: '/lock',
    tokenTime: 6000,
    //http的status默认放行不才用统一处理的,
    statusWhiteList: [],
    // 布局方式(nav：显示侧边栏导航；top：仅显示头部导航)
    layoutType: 'nav',
    //配置首页标签不可关闭
    isFirstPage: false,
    // 默认打开首页
    fistPage: {
        label: "首页",
        value: "/wel/index",
        params: {},
        query: {},
        meta: {
            i18n: 'dashboard'
        },
        group: [],
        close: false
    },
    //配置菜单的属性
    menu: {
        iconDefault: 'iconfont icon-caidan',
        props: {
            label: 'name',
            path: 'path',
            icon: 'source',
            children: 'children'
        }
    }
}