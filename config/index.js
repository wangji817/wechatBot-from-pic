module.exports = {
  ONE_HOST: 'http://wufazhuce.com/', // ONE的web版网站
  MOJI_HOST: 'https://tianqi.moji.com/weather/china/zhejiang/hangzhou/xihu-district', // 中国墨迹天气url
  TEP_HOST: 'http://localhost:3000/temp', // 生成消息图片用的HTML模板页面
  TEP_PIC_NAME: 'WechatIMG.png', // 生成的消息图片名  
  ALIAS: ['Night'], // 备注姓名  
  // GETUP_TIME: '00 00 07 * * *', // 每天发送第一条消息的时间，每天7点00分00秒发送
  DRINK_TIME: [    
    { time: '00 00 07 * * *', words: '起床啦，小番茄喊你起床了' },
    { time: '00 45 11 * * *', words: '听说午餐后喝水，能减负减肥' },
    // { time: '00 30 12 * * *', words: '饭后百步走，走完该歇一歇了' },
    { time: '00 45 14 * * *', words: '喝杯水，给眼睛休息下' },
    { time: '00 45 16 * * *', words: '下班咯，回去路上注意安全' },    
    { time: '00 00 22 * * *', words: '有点晚了，该休息了，小番茄都开始困了' }
  ],
  EVERYDAYTIME:"00 01 * * * *",
  EVERYDAYRESETTIME:"00 01 00 * * *"
}
