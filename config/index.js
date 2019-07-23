module.exports = {
  ONE_HOST: 'http://wufazhuce.com/', // ONE的web版网站
  MOJI_HOST: 'https://tianqi.moji.com/weather/china/zhejiang/hangzhou/xihu-district', // 中国墨迹天气url
  TEP_HOST: 'http://localhost:3000/temp', // 生成消息图片用的HTML模板页面
  TEP_PIC_NAME: 'WechatIMG.png', // 生成的消息图片名  
  ALIAS: 'Shopping', // 备注姓名
  // ALIAS: 'Night', // 备注姓名
  GETUP_TIME: '00 00 7 * * *', // 每天发送第一条消息的时间，每天7点00分00秒发送
  DRINK_TIME: [
    { time: '00 20 7 * * *', words: '起床喝水，排毒养颜，路上开车慢点哦' },
    { time: '00 00 9 * * *', words: '要准备上班啦，先喝杯水吧' },
    { time: '00 30 11 * * *', words: '听说午餐后喝水，能减负减肥' },
    { time: '00 00 15 * * *', words: '喝杯水，给眼睛休息下' },
    { time: '00 00 16 * * *', words: '再坚持坚持就下班啦' },
    { time: '00 00 17 * * *', words: '下班咯，回去路上注意安全' },
    { time: '00 00 22 * * *', words: '睡觉前也别忘了喝水' }
  ]
}
