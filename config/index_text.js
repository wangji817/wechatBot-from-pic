// 配置文件
module.exports = {
    // 基础定时发送功能配置项（必填项）    
    NICKNAME1: '公司群名1', //昵称    
    NICKNAME2: '公司群名2',
    NICKNAME3: '公司群名3',
    // SENDDATE: '00 24 17 * * 4', //定时发送时间 每天9点0分0秒发送，规则见 /schedule/index.js    
    SENDDATE1: '00 30 17 * * 5', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    每周五 17点30分发送    
    SENDDATE4: '00 30 09 * * {day}', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    每周一至周五 9点30分发送
    SENDDATE5: '00 30 17 * * {day}', //定时发送时间 每分钟内的30秒发送，规则见 /schedule/index.js    每周一至周五 17点30分发送    
    SECONDDATE: '30 * * * * *', //测试
    roomDesc1: '@所有人<br>{time}<br>大家好，<br>每周壹句：{oneday}',
    roomDesc2: "@所有人<br>{time}<br>大家好，核酸记得不要忘记做哦~~",
}   
