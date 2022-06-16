const schedule = require('node-schedule')
const puppeteer = require('puppeteer')
const { FileBox } = require('file-box')
// const FileBox = require('wechaty').FileBox;
const config = require('../config/index_pic')
const config2 = require('../config/index_text')
const haha = require('../config/haha.json');
const getOneData = require('./get-data-one')
const getWeatherData = require('./get-data-weather')
const { getShotpng } = require('./get-data-temp')
const utils = require('../utils')
const axios = require('axios')

/**
 * 开始定时任务
 * @param {Objcet} bot 微信机器人
 */
async function echJob(bot, TIME, words, type, newWords) {
  schedule.scheduleJob(TIME, async () => {
    try {
      // 把取到的值赋给变量tempData
      // global.tempData = { weaTips, weaTemp, weaImg, weaStatus, oneImg, oneWords, words }
      //获取整个页面数据
      await getShot();
      // 重新启动一个浏览器，并截图
      await getShotpng()
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

async function getShot() {
  global.shotData = {
    oneJson: {}
  }
  await axios.get('xxx', { params: { 'vt': '9' } }).then(async (data) => {
    // 启动浏览器
    const browser = await puppeteer.launch()
    // 获取墨迹天气数据
    const pageMoji = await browser.newPage()
    await pageMoji.goto(config.MOJI_HOST)
    const { weaTips, weaTemp, weaImg, weaStatus } = await getWeatherData(pageMoji)
    // 获取One数据
    const pageOne = await browser.newPage()
    await pageOne.goto(config.ONE_HOST)
    let { oneWords } = await getOneData(pageOne)
    await browser.close();
    global.shotData = {
      oneJson: data.data[34601].data.miguSentenceList[0], oneWords, weaTips, weaTemp, weaImg, weaStatus
    }
  }).catch((error) => {
    console.log(error.name, error.message);
  });
}

async function wxSay(bot) {
  const msg = FileBox.fromFile(config.TEP_PIC_NAME)
  const Night = await bot.Contact.find({ name: 'Night' }) || await bot.Contact.find({ alias: 'Night' })
  await Night.say(msg);
  const Silence = await bot.Contact.find({ name: 'Silence' }) || await bot.Contact.find({ alias: 'Silence' })
  await Silence.say(msg);
}

async function startScheduleJob(bot) {

  // 喝水提醒  
  const drinks = config.DRINK_TIME;
  drinks.map(item => {
    echJob(bot, item.time, '', "2", haha[item.type]);
  })
  // 工作提醒
  await initDay(bot);
}

// 创建微信每日说定时任务
async function initDay(bot) {
  schedule.scheduleJob(config2.SENDDATE1, async () => {
    await sayDat(bot, 1);
  });
  for (let index = 1; index <= 5; index++) {
    console.log(index, config2.SENDDATE4.replace('{day}', index), config2.SENDDATE5.replace('{day}', index));
    schedule.scheduleJob(config2.SENDDATE4.replace('{day}', index), async () => {
      await sayDat(bot, 2);
      await sayDat(bot, 3);
    });
    schedule.scheduleJob(config2.SENDDATE5.replace('{day}', index), async () => {
      await sayDat(bot, 2);
      await sayDat(bot, 3);
    });
  }
  //测试
  // schedule.scheduleJob(config2.SECONDDATE, async () => {
  //   await sayDat(bot, 1);
  //   await sayDat(bot, 2);
  //   await sayDat(bot, 3);
  // });
}

async function sayDat(bot, type) {
  let logMsg = null;
  try {
    const { NICKNAME1, NICKNAME2, NICKNAME3, roomDesc1, roomDesc2 } = config2;
    let botsay = null;
    let str = ""
    // 启动浏览器
    const browser = await puppeteer.launch()
    // 获取墨迹天气数据
    const pageMoji = await browser.newPage()
    await pageMoji.goto(config.MOJI_HOST)
    const { weaTemp, weaTips, weaStatus } = await getWeatherData(pageMoji)
    // 获取One数据
    const pageOne = await browser.newPage()
    await pageOne.goto(config.ONE_HOST)
    let { oneWords } = await getOneData(pageOne)
    // 获取时间
    const today = utils.getToday()

    if (type === 1) {
      botsay = await bot.Room.find(NICKNAME1) // 获取你要发送的联系人    
      str = roomDesc1.replace("{time}", `${today}<br>${weaTemp} ${weaStatus} ${weaTips}`).replace("{oneday}", `${oneWords}`)
    } else if (type === 2) {
      botsay = await bot.Room.find(NICKNAME2) // 获取你要发送的联系人      
      str = roomDesc2.replace("{time}", `${today}<br>${weaTemp} ${weaStatus} ${weaTips}`)
    } else if (type === 3) {
      botsay = await bot.Room.find(NICKNAME3) // 获取你要发送的联系人
      str = roomDesc2.replace("{time}", `${today}<br>${weaTemp} ${weaStatus} ${weaTips}`)
    }
    logMsg = str
    await botsay.say(str) // 发送消息
  } catch (e) {
    logMsg = e.name + ':' + e.message
  }
  console.log(logMsg)
}

module.exports = startScheduleJob
