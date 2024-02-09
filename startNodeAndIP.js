

const config = require('./config')
const fs = require('fs');
const { exec } = require('child_process');
const LOG_FILE = 'node.log'; 
let loopCounter = 0;
main();
async function main(){
    config.sleep(2000)
    
    while (config.RUNNODE == 1) {
        if (loopCounter >=3){
            exec('/home/jason/Documents/FarmOnLinux/startup/startSession.sh', (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing startSession.sh:', error);
                    return;
                }
                console.log('stdout:', stdout);
                // console.error('stderr:', stderr);
            });
        }
        console.clear();
        await config.sendTelegramMessage(`IP: ${config.getIpAddress()} \n Starting Node`)
        console.log('starting Node');
        config.ensureDirectoryExistence(LOG_FILE)
        await config.deleteLogFile(LOG_FILE);
        await runNode();
        await config.sleep(10000); // 10 seconds delay
        loopCounter++;
    }

}


async function runNode() {
    try {
        
        const childProcess = exec(config.NODE);
        
        let errorCount = 0;
        let lastMessageSentTime = Date.now();

        // config.ensureDirectoryExistence(LOG_FILE)

        childProcess.stdout.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            console.log(data);
                loopcounter = 0;
            if (Date.now() - lastMessageSentTime >= (config.TIMER || 10) * 60 * 1000) {
                // Send message to Telegram
                lastMessageSentTime = Date.now();
                await config.sendTelegramMessage(data);
                
                // Update the last message sent time
                
            }
        });
       

        childProcess.stderr.on('data', async (data) => {
            fs.appendFileSync(LOG_FILE, data);
            console.log(data);
            await config.sendTelegramMessage(`ERROR: ${data}`);

            errorCount++;
            if (errorCount >=3){
                childProcess.kill()
                
                
            }
        });

        await new Promise((resolve) => {
            childProcess.on('exit', () => {
                resolve();
            });
        });
    } catch (error) {
        console.error('Error:', error);
        // config.sendTelegramMessage('Farmer ${error}') 
    }
}
