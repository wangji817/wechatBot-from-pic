const { WechatyBuilder } = require('wechaty');
const generateQrcode = require('qrcode-terminal')
const startScheduleJob = require('./schedule-job')


/**
 * 登录微信，并开始执行定时任务
 */

function startTask() {
  let bot = WechatyBuilder.build({
    name: 'wechat-puppet-wechat',
    puppet: 'wechaty-puppet-wechat'
  })
  bot.on('scan', (qrcode, status) => {
    generateQrcode.generate(qrcode, { small: true });
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('');
    console.log('微信二维码：', qrcodeImageUrl);
  })
  bot.on('login', user => {
    console.log(`当前登录的用户是：${user}`);
    startScheduleJob(bot);
  })
  bot.on('message', message => console.log(`Message: ${message}`)).start()
}

module.exports = startTask