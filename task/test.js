const { Wechaty } = require('wechaty')
const generateQrcode = require('qrcode-terminal')


/**
 * 登录微信，并开始执行定时任务
 */
global.bot = null;
function startTask() {
  global.bot = new Wechaty()
  global.bot.on('scan', (qrcode, status) => {
    // console.log(`扫描二维码: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`)
    generateQrcode.generate(qrcode, function(code) {
      console.log(code)
    })
  })
  global.bot.on('login', (user) => {
    console.log(`用户 ${user} 登录成功`)
    // 登陆后创建定时任务
    console.log(bot);
  })
  global.bot.on('message', (message) => console.log(`收到消息: ${message.text()}`))  
  global.bot.start()
}
startTask()