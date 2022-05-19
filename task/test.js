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






// 书单海报B+C接口名：bksheetPoster

// 数据格式：
// {
//     URL:"",传空
//     bigLogo:"",传空
//     contentType:"xx",
//     title:"书单标题",
//     bookList:["图书列表，后端需返回所有图书信息"],新增字段
//     description:"书单描述",
//     userShowName:"创建者昵称",新增字段
//     headImgUrl:"创建者头像",新增字段        
//     tagNameList:["标签列表"],新增
//     qrPicUrl:"二维码",新增
//     style:"样式类型" 可能是ues变量控制展示类型    
// }