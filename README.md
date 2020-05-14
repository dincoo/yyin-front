 <p align="center">
      <img src="https://img.shields.io/badge/Release-V2.7.0-green.svg" alt="Downloads">
      <img src="https://img.shields.io/badge/JDK-1.8+-green.svg" alt="Build Status">
  <img src="https://img.shields.io/badge/license-Apache%202-blue.svg" alt="Build Status">
   <img src="https://img.shields.io/badge/Spring%20Cloud-Hoxton.SR3-blue.svg" alt="Coverage Status">
   <img src="https://img.shields.io/badge/Spring%20Boot-2.2.6.RELEASE-blue.svg" alt="Downloads">
   <a target="_blank" href="https://bladex.vip">
   <img src="https://img.shields.io/badge/Author-Small%20Chill-ff69b4.svg" alt="Downloads">
 </a>
 <a target="_blank" href="https://bladex.vip">
   <img src="https://img.shields.io/badge/Copyright%20-@BladeX-%23ff3f59.svg" alt="Downloads">
 </a>
 </p>  

## SpringBlade微服务开发平台
* 采用前后端分离的模式，前端开源两个框架：[Sword](https://gitee.com/smallc/Sword) (基于 React、Ant Design)、[Saber](https://gitee.com/smallc/Saber) (基于 Vue、Element-UI)
* 后端采用SpringCloud全家桶，并同时对其基础组件做了高度的封装，单独开源出一个框架：[BladeTool](https://github.com/chillzhuang/blade-tool)
* [BladeTool](https://github.com/chillzhuang/blade-tool)已推送至Maven中央库，直接引入即可，减少了工程的臃肿，也可更注重于业务开发
* 集成Sentinel从流量控制、熔断降级、系统负载等多个维度保护服务的稳定性。
* 注册中心、配置中心选型Nacos，为工程瘦身的同时加强各模块之间的联动。
* 使用Traefik进行反向代理，监听后台变化自动化应用新的配置文件。
* 极简封装了多租户底层，用更少的代码换来拓展性更强的SaaS多租户系统。
* 借鉴OAuth2，实现了多终端认证系统，可控制子系统的token权限互相隔离。
* 借鉴Security，封装了Secure模块，采用JWT做Token认证，可拓展集成Redis等细颗粒度控制方案。
* 稳定生产了一年，经历了从Camden -> Greenwich的技术架构，也经历了从fat jar -> docker -> k8s + jenkins的部署架构
* 项目分包明确，规范微服务的开发模式，使包与包之间的分工清晰。


## 官网
* 官网地址：[https://bladex.vip](https://bladex.vip)
* 问答社区：[https://sns.bladex.vip](https://sns.bladex.vip)
* 会员计划：[SpringBlade会员计划](https://gitee.com/smallc/SpringBlade/wikis/SpringBlade会员计划)
* 交流一群：`477853168`(满)
* 交流二群：`751253339`(满)
* 交流三群：`784729540`

## 在线演示
* Saber-基于Vue：[https://saber.bladex.vip](https://saber.bladex.vip)
* Sword-基于React：[https://sword.bladex.vip](https://sword.bladex.vip)
* Archer-全能代码生成系统：[https://archer.bladex.vip](https://archer.bladex.vip)
* Caster-数据大屏展示系统：[https://data.avuejs.com](https://data.avuejs.com)

## 技术文档
* [SpringBlade开发手册一览](https://gitee.com/smallc/SpringBlade/wikis/SpringBlade开发手册)
* [常见问题集锦](https://sns.bladex.vip/article-14966.html)

## 项目地址
* 后端Gitee地址：[https://gitee.com/smallc/SpringBlade](https://gitee.com/smallc/SpringBlade)
* 后端Github地址：[https://github.com/chillzhuang/SpringBlade](https://github.com/chillzhuang/SpringBlade)
* 后端SpringBoot版：[https://gitee.com/smallc/SpringBlade/tree/2.0-boot/](https://gitee.com/smallc/SpringBlade/tree/2.0-boot/)
* 前端框架Sword(基于React)：[https://gitee.com/smallc/Sword](https://gitee.com/smallc/Sword)
* 前端框架Saber(基于Vue)：[https://gitee.com/smallc/Saber](https://gitee.com/smallc/Saber)
* 核心框架项目地址：[https://github.com/chillzhuang/blade-tool](https://github.com/chillzhuang/blade-tool)

## 用户权益
* 允许免费用于学习、毕设、公司项目、私活等。
* 代码文件需保留相关license信息。
* 禁止直接将本项目挂淘宝等商业平台出售。
* 非界面代码50%以上相似度的二次开源，二次开源需先联系作者。

## 如何启动
```
$ git clone https://gitee.com/smallc/Saber.git
$ cd Saber
# 安装
$ yarn install
# 启动
$ yarn run serve     
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