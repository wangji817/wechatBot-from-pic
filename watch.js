const child_process = require('child_process');
    
async function start() {
    if (typeof start !== 'string') {
        console.log('开始程序 pm2 start app.js');
    }
    
    var proc = child_process.exec('pm2 start app.js', (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
    });
    setTimeout(() => { stop(); }, 18000 * 1000);
}

async function stop() {
    if (typeof stop !== 'string') {
        console.log('停止程序 stop ');
    }    
    var proc = child_process.exec('pm2 stop app.js', (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
    });
    setTimeout(() => { start(); }, 1000);
}

start();