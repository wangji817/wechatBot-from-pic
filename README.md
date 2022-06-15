# WeChat-bot
微信定时给指定用户发送提醒消息

wechat模块需要手动安装

nodejs >= 16

cnpm install child_process express mkdirp node-schedule pug puppeteer qrcode-terminal wechaty wechaty-puppet-puppeteer

or

yarn add child_process express mkdirp node-schedule pug puppeteer qrcode-terminal wechaty wechaty-puppet-puppeteer file-box

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
|   `-- index.js
|-- info.md
|-- package-lock.json
|-- package.json
|-- task
|   |-- get-data-one.js
|   |-- get-data-temp.js
|   |-- get-data-weather.js
|   |-- index.js
|   `-- schedule-job.js
|-- utils
|   `-- index.js
`-- views
    |-- css
    |   `-- template.css
    |-- img
    |   `-- demo.png
    |-- index.pug
    |-- js
    |   `-- index.js
    `-- template.pug
```