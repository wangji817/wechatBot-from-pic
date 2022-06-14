module.exports = {
  ONE_HOST: 'http://wufazhuce.com/', // ONE的web版网站
  MOJI_HOST: 'https://tianqi.moji.com/weather/china/zhejiang/hangzhou/xihu-district', // 中国墨迹天气url
  TEP_HOST: 'http://localhost:3000/temp', // 生成消息图片用的HTML模板页面
  TEP_PIC_NAME: 'WechatIMG.png', // 生成的消息图片名  
  ALIAS: ['Night', 'Slience'], // 备注姓名  
  // GETUP_TIME: '00 00 07 * * *', // 每天发送第一条消息的时间，每天7点00分00秒发送
  DRINK_TIME: [
    { time: '00 45 06 * * *', type: 'morning' },
    { time: '00 30 22 * * *', type: 'evening' },
  ],
  EVERYDAYTIME: "00 01 * * * *",
  EVERYDAYRESETTIME: "00 01 00 * * *"
}