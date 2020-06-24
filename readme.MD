# O2O商户端 by wepy2

## 项目打开方式

### 安装依赖
```javascript
npm i
```
### 启动项目
```javascript
npm run dev
```

### 清空上次编译的文件（适用于编译文件错误的情况)
```javascript
npm run cleacn
```

### 打包发布
```javascript
npm run build
```

### 彩蛋
```javascript
npm run restart === npm run clean && npm run dev
```

### 将工程导入微信开发者工具
1.将根目录下project.config.json.tmpl文件，去掉尾部的.tmpl，并修改该文件中的appid等小程序配置。

2.启动微信开发者工具-导入项目-选择项目根目录（注意是根目录，但是编译后的文件在webapp中，在project.config.json中已经配置好了指向的)。

### 以下几种情况可能需要运行npm run restart
1.更新了icon.scss文件，可能不会触发编译
2.语法严重错误，导致热编译机制失效
3.出现控制台提示某个静态资源或者js确实，偶尔也会有app.json缺失

`
注意在运行npm run restart 和npm run dev之前，都建议先关掉微信开发者工具（因为微信开发者工具也会监听项目中的webapp文件变动，触发刷新。在wepy完成初次启动之前，尽量避免两个编译机制对一个文件夹同时起作用，综合测试下来这种方式效率最高）
`

## wepy2

### 简介
WePY (发音: /'wepi/) 项目启动于 2016 年 11 月份， 是小程序最早的框架之一，是一款让小程序支持组件化开发的框架，通过预编译的手段让开发者可以选择自己喜欢的开发风格去开发小程序。

### 学习资料
详情参见[wepy2官方文档](https://wepyjs.github.io/wepy-docs/2.x/#/)

### 上手建议
有一定的vue基础，即可快速上手。

#### 重点是了解生命周期
[页面和组件生命周期](https://wepyjs.github.io/wepy-docs/2.x/#/base/instance?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)

#### 跨页面触发事件
参见本项目的src/common/eventHub.js文件

## 项目文件目录
### 组件和页面命名
1.不推荐使用单个单词组成文件/组件名
2.文件名大驼峰，引入组件的时候html-case
### 公共样式
src/assets/*.scss
### 前后端通讯
1.关于请求的统一封装参见src/common/request.js
2.单个请求封装：按照模块放在src/api中
### vuex
1.支持vuex
2.建议使用modules机制，分模块组织不同的模块。
### mixin机制
参见src/mixins/index.js，提供了很多$开头的方法，并且提供系统信息systemInfo、以及小程序胶囊按钮信息menuButtonInfo的用得非常多的变量
### 关于图标
参见src/components/icon.wpy组件以及src/assets/icon.scss
推荐使用矢量图标，具体用法自行参考[使用iconfont图标](https://www.jianshu.com/p/7fc08b1b4d85).
额外建议：使用iconfont图标，一个项目中的所有图标需要对齐基线，不然图标会达不到预期的效果。参见[CSS > ICONFONT 基线和大小问题](https://blog.csdn.net/weixin_34114823/article/details/88967683)
