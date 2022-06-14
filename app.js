const express = require('express')
const utils = require('./utils')
const task = require('./task')

const app = express()
app.use(express.static('views'))
app.set('view engine', 'pug')

app.get('/temp', (req, res) => {
  const formatedDate = utils.getDate()
  const date = `${formatedDate}`
  // global.tempData = {
  //   weaTips: '今天有雨，有些热了，记得多喝水。',
  //   weaTemp: '20° / 31°',
  //   weaImg: 'https://h5tq.moji.com/tianqi/assets/images/weather/w7.png',
  //   weaStatus: '小雨',
  //   oneImg: 'http://image.wufazhuce.com/Fs4jhYFBwxBT21gYTjjwGllCa-UD',
  //   oneWords: '生活是什么？是在通向死亡的前厅短暂的停留。',
  //   words: '做一个平静的人，做一个善良的人，做一个微笑挂在嘴边，快乐放在心上的人。愿我小小的问候带给你快乐，早安！'
  // }
  global.tempData.date = date;
  console.log(global.tempData)
  res.render('template', global.tempData)
  res.end();
})

app.listen(3000, async () => {
  console.log('Example app listening on port 3000!')
  task()
})