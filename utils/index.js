// 从认识到今天的总天数
function getDay(date) {
  const dateNow = new Date()
  const dateMet = new Date(date)
  const days = parseInt(Math.abs(dateNow.getTime() - dateMet.getTime()) / 1000 / 60 / 60 / 24)
  return days
}

function getDate() {
  const today = new Date()
  const todayArr = today.toString().split(' ')
  return `${todayArr[2]} ${todayArr[1]}.${todayArr[3]}`
}

function getToday() {
  var tempDate = new Date();
  var year = tempDate.getFullYear();
  var month = tempDate.getMonth() + 1;
  var day = tempDate.getDate();
  var hour = tempDate.getHours();
  var min = tempDate.getMinutes();
  var second = tempDate.getSeconds();
  var week = tempDate.getDay();
  var str = ''
  if (week === 0) {
    str = '星期日'
  } else if (week === 1) {
    str = "星期一";
  } else if (week === 2) {
    str = "星期二";
  } else if (week === 3) {
    str = "星期三";
  } else if (week === 4) {
    str = "星期四";
  } else if (week === 5) {
    str = "星期五";
  } else if (week === 6) {
    str = "星期六";
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (second < 10) {
    second = "0" + second;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day + "日 " + hour + ":" + min + ' ' + str;
}
module.exports = {
  getDay,
  getDate,
  getToday,
}
