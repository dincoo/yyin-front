module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        //忽略的打包文件
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
        })
        const entry = config.entry('app')
        entry
            .add('babel-polyfill')
            .end()
        entry
            .add('classlist-polyfill')
            .end()
            // entry
            //     .add('@/mock')
            //     .end()
    },
    devServer: {
        // 端口配置
        port: 1888,
        // 反向代理配置
        proxy: {
            /**
             * 代理到真实后台接口 
             * */
            '/wechat': {
                target: 'http://192.168.87.55:8074',
                ws: true,
                pathRewrite: {
                    '^/wechat': '/zengtest/wechat'
                }
            },

            // '/api': {
            //     target: 'http://192.168.81.177:8088',
            //     ws: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },

            /**
             * 代理到本地mock服务 
             * */
            '/api/management-platform': {
                target: 'http://localhost:3618',
                ws: true,
                pathRewrite: {
                    '^/api/management-platform': '/api'
                }
            },
            // '/wechat': {
            //     target: 'http://localhost:3618',
            //     ws: true,
            //     pathRewrite: {
            //         '^/wechat': '/api/wechat'
            //     }
            // }
        }
    }
}