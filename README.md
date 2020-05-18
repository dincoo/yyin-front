 

## 如何启动
```
$ git clone https://gitee.com/smallc/Saber.git
$ cd Saber
# 安装
$ yarn install
# 启动
$ yarn run serve     
# mock数据
yarn run mock
```
## 主要文件
permission.js 路由权限相关逻辑。用全局的路由钩子，每次路由跳转前，会验证用户是否已登录（即cookie存在并尚未失效）。若已登录：锁屏被激活，则跳转到锁屏页；否则跳转到对应的页面或标签页。若未登录并且跳转到需验证权限的页面，则重定向到登录页。
备注：首页头部有个锁屏按钮，类似电脑的锁屏功能，锁屏之后，输入密码才能从新进入首页。
src/util/auth.js中使用js-cookie封装了token的读写，并设置了2小时的有效时间。
src/config/website.js 是全局配置文件，首次进入时的默认值。主要设置：captchaMode是否开启验证码，isFirstPage首页标签是否可关闭。
src/router/avue-router 中含有大量封装到路由中的方法，其中动态生成路由逻辑较复杂，已补充注释。

## 路由说明
路由分为page路由和view路由（view即内容页的路由）。页面放在src/page里面，首页中嵌入的标签页放在view。页面路由对应的配置在src/router/page和src/router/view。page路由会在meta里配置keepAlive: true来缓存页面，isTab: false来表示非标签页，isAuth: false来表示无需验证权限的页面。avue-router已插件的方式向路由注入大量逻辑，可通过this.$router.$avueRouter来调用对应的方法。
## 更换主题原理
在main.js引入样式，包含了指定的几种主题样式，当主题变化时，用js修改body的class为src/styles/theme中对应的css类名。
## 缺陷
错误日志存储在浏览器本地，需手动上传到服务器。日志记录的内容不能很好的定位到错误来源。
主题色切换，只改变头部和侧边栏的主题色，未改变内容页的颜色。
头部的换色功能无效。
手机号登录和第三方登录功能无效。
字体图标没有演示地址（http://blog.luckly-mjw.cn/tool-show/iconfont-preview/index.html 借助第三方转化，查看字体图标）。

## 规范
page页面放在src/page（全局页面）；view页面放在src/view（标签页面）。
page页面对应的路由放在src/router/page里；view页面对应的路由放在src/router/view，且路由中path必须与view或page下文件夹名字对应。
所有view页面必须用basic-container组件包裹起来。
代码风格已在.editorconfig文件里设置，不可随意修改。
所有后台请求都在src/api里统一封装，页面引入接口对应的方法。