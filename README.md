# WeChat-bot
微信定时给指定用户发送提醒消息（图片和发群消息）

wechat模块需要手动安装，需要的环境

[![node](https://img.shields.io/node/v/wechaty.svg)](https://nodejs.org/) ![](https://img.shields.io/static/v1?label=&message=pm2&color=orange)

### 推荐yarn或cnpm安装

cnpm install child_process express mkdirp node-schedule pug puppeteer qrcode-terminal wechaty wechaty-puppet-puppeteer

or

yarn add child_process express mkdirp node-schedule pug puppeteer qrcode-terminal wechaty wechaty-puppet-puppeteer file-box

### 步骤
```
1、修改config/下部分配置项
2、修改task/schedule-job.js中部分代码
3、控制台输入pm2 start watch.js，等待微信二维码出现，扫描进入即可
```

新版兼容web wechaty设置

```
npm install qrcode-terminal --save
npm install wechaty 
npm install wechaty-puppet-wechat --save // 这个依赖是关键
export WECHATY_PUPPET=wechaty-puppet-wechat // 这里也是关键，需要配置你使用的puppet
```

目录

```
|-- README.md
|-- WechatIMG.png
|-- app.js
|-- config
|   |               `-- haha.json
|   |               `-- index_pic.js
|                   `-- index_text.js
|-- info.md
|-- package.json
|-- task
|   |               `-- get-data-one.js
|   |               `-- get-data-temp.js
|   |               `-- get-data-weather.js
|   |               `-- index.js
|   |               `-- schedule-job.js
|                   `-- test.js
|-- utils
|                   `-- index.js
|-- views
|   |               `-- css
|   |   |           `-- shot.css
|   |               `-- template.css
|   |-- img
|   |               `-- demo.png
|   |-- index.pug
|   |-- js
|   |               `-- index.js
|   |-- shot.pug
|   `-- template.pug
|-- watch.js
|-- wechat-puppet-wechat.memory-card.json
```
