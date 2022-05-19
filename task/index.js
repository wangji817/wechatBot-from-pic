const { Wechaty } = require('wechaty')
const generateQrcode = require('qrcode-terminal')
const startScheduleJob = require('./schedule-job')

/**
 * 登录微信，并开始执行定时任务
 */
global.bot = null;

function resetBot(bot){
  bot.start();
}

function startTask() {
  global.bot = new Wechaty({ name: 'WechatEveryDay' ,puppet:"wechaty-puppet-puppeteer"})
  global.bot.on('scan', (qrcode, status) => {
    // console.log(`扫描二维码: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`)
    // generateQrcode.generate(qrcode, function(code) {
    //   console.log(code)
    // })
    require('qrcode-terminal').generate(qrcode) // 在console端显示二维码
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',encodeURIComponent(qrcode),
    ].join('')
    console.log(qrcodeImageUrl)
  })
  global.bot.on('login', (user) => {
    console.log(`用户 ${user} 登录成功`)
    // 登陆后创建定时任务
    // console.log(bot.userSelf());
    startScheduleJob(global.bot)
  })
  global.bot.on('message', (message) => console.log(`收到消息: ${message.text()}`))
  global.bot.on('logout', () =>{
    console.log(`注销了bot...`);    
    global.bot.stop();
    resetBot(global.bot);
  });  
  global.bot.start();
}

module.exports = startTask
