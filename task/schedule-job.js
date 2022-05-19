const schedule = require('node-schedule')
const puppeteer = require('puppeteer')
// const { FileBox } = require('file-box')
const { FileBox } = require('wechaty')
const config = require('../config')
const getOneData = require('./get-data-one')
const getWeatherData = require('./get-data-weather')
const getTemp = require('./get-data-temp')

/**
 * 开始定时任务
 * @param {Objcet} bot 微信机器人
 */
async function echJob(bot,TIME,words,type){
  schedule.scheduleJob(TIME, async () => {
    try {
      // 启动浏览器
      const browser = await puppeteer.launch()
      // 获取墨迹天气数据
      const pageMoji = await browser.newPage()
      await pageMoji.goto(config.MOJI_HOST)
      const { weaTips, weaTemp, weaImg, weaStatus } = await getWeatherData(pageMoji)
      // 获取One数据
      const pageOne = await browser.newPage()
      await pageOne.goto(config.ONE_HOST)      
      let { oneImg, oneWords } = await getOneData(pageOne)      
      
      console.log("data:",oneImg, oneWords,words);
      // 关闭浏览器
      await browser.close()
      // 把取到的值赋给变量tempData
      global.tempData = { weaTips, weaTemp, weaImg, weaStatus, oneImg, oneWords,words }
      // 重新启动一个浏览器，并截图
      await getTemp()
      // 发消息   
      const login = bot.logonoff();        
      console.log(login,type);
      if(type === "2"){
        config.ALIAS.map((item,index)=>{
          wxSay(bot,item);        
        });
      }else if(type === "4"){
        process.exit(0);
      }else{
        bot.say(words);
      }
    } catch (err) {
      console.log('错误：\n', err)
    }
  })
}

async function wxSay(bot,item){
  const weiba = await bot.Contact.find({ name: item })||await bot.Contact.find({ alias: item })
  const msg = FileBox.fromFile(config.TEP_PIC_NAME)
  weiba.say(msg);
}

async function startScheduleJob(bot) {
  // 每日天气
  // echJob(bot,config.GETUP_TIME,"","1");

  // 喝水提醒
  const drinks = config.DRINK_TIME;
  for (let drink of drinks) {
    echJob(bot,drink.time,drink.words,"2");
  }

  //间隔1分钟监听一次机器人登录状态  
  echJob(bot,config.EVERYDAYTIME,"咚咚，还在吗","3");
  echJob(bot,config.EVERYDAYRESETTIME,"重启进程","4");  
}

module.exports = startScheduleJob
