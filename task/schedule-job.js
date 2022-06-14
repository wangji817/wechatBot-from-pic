const schedule = require('node-schedule')
const puppeteer = require('puppeteer')
const { FileBox } = require('file-box')
// const FileBox = require('wechaty').FileBox;
const config = require('../config')
const haha = require('../config/haha.json');
const getOneData = require('./get-data-one')
const getWeatherData = require('./get-data-weather')
const getTemp = require('./get-data-temp')

/**
 * 开始定时任务
 * @param {Objcet} bot 微信机器人
 */
async function echJob(bot, TIME, words, type, newWords) {
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

      if (type === "2") {
        const msg = newWords[Math.floor(Math.random() * newWords.length)];
        words = msg;
      }
      console.log("data:", oneImg, oneWords, words);
      // 关闭浏览器
      await browser.close()
      // 把取到的值赋给变量tempData
      global.tempData = { weaTips, weaTemp, weaImg, weaStatus, oneImg, oneWords, words }
      // console.log(global.tempData);
      // 重新启动一个浏览器，并截图
      await getTemp()
      // 发消息               
      if (type === "2") {
        wxSay(bot);
      } else if (type === "4") {
        process.exit(0);
      } else {
        bot.say(words);
      }
    } catch (err) {
      console.log('错误：', err.name, err.message);
    }
  })
}

async function wxSay(bot) {
  const msg = FileBox.fromFile(config.TEP_PIC_NAME)
  const Night = await bot.Contact.find({ name: 'Night' }) || await bot.Contact.find({ alias: 'Night' })
  const Silence = await bot.Contact.find({ name: 'Silence' }) || await bot.Contact.find({ alias: 'Silence' })
  await Night.say(msg);
  await Silence.say(msg);
}

async function startScheduleJob(bot) {
  // 每日天气
  // echJob(bot,config.GETUP_TIME,"","1");

  // 喝水提醒  
  const drinks = config.DRINK_TIME;
  drinks.map(item => {
    echJob(bot, item.time, '', "2", haha[item.type]);
  })

  //间隔1分钟监听一次机器人登录状态  
  // echJob(bot, config.EVERYDAYTIME, "咚咚，还在吗", "3");
  // echJob(bot, config.EVERYDAYRESETTIME, "重启进程", "4");  
}

module.exports = startScheduleJob
